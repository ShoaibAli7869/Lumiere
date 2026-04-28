import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";

export default function ProductCard({ product }) {
  const addItem = useCartStore((s) => s.addItem);

  const { isWishlisted, toggle } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();
  const wishlisted = isWishlisted(product._id);

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return toast.error("Sign in to save items");
    await toggle(product._id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success("Added to cart");
  };

  const img =
    product.images?.[0]?.url ||
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80";
  const hasDiscount = product.comparePrice > product.price;

  return (
    <Link
      to={`/shop/${product._id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
    >
      <div
        className="card"
        style={{
          overflow: "hidden",
          position: "relative",
          cursor: "pointer",
          transition: "box-shadow 0.25s",
        }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.12)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.boxShadow = "var(--shadow-card)")
        }
      >
        {hasDiscount && (
          <span
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              zIndex: 2,
              background: "var(--color-cta-dark)",
              color: "#fff",
              fontSize: "10px",
              fontWeight: 700,
              padding: "2px 8px",
              borderRadius: "50px",
            }}
          >
            Sale
          </span>
        )}
        <button
          onClick={handleWishlist}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 2,
            background: "#fff",
            border: "none",
            borderRadius: "50%",
            width: "30px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
          }}
        >
          <Heart
            size={13}
            fill={wishlisted ? "#C82014" : "none"}
            color={wishlisted ? "#C82014" : "var(--color-ink-soft)"}
          />
        </button>

        {/* Image */}
        <div
          style={{
            overflow: "hidden",
            background: "var(--color-canvas-alt)",
            height: "220px",
          }}
        >
          <img
            src={img}
            alt={product.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
              opacity: 1,
              transition: "transform 0.4s ease",
            }}
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
        </div>

        {/* Info */}
        <div style={{ padding: "0.9rem" }}>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              color: "var(--color-ink)",
              fontWeight: 500,
              marginBottom: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {product.name}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
            }}
          >
            <span
              style={{
                fontSize: "0.9rem",
                fontWeight: 700,
                color: "var(--color-ink)",
              }}
            >
              ${product.price.toFixed(2)}
            </span>
            {hasDiscount && (
              <span
                style={{
                  fontSize: "0.78rem",
                  color: "var(--color-ink-soft)",
                  textDecoration: "line-through",
                }}
              >
                ${product.comparePrice.toFixed(2)}
              </span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="btn btn-primary"
            style={{
              width: "100%",
              fontSize: "0.78rem",
              padding: "0.45rem 0.75rem",
              gap: "5px",
            }}
          >
            <ShoppingBag size={13} /> Add To Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
