import { Heart, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

const products = [
  {
    id: 1,
    name: "Stackable Bezel Ring",
    price: "$49.00",
    badge: "Sale 10%",
    img: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&q=80",
  },
  {
    id: 2,
    name: "Golden Medallion Necklace",
    price: "$89.00",
    oldPrice: "$110.00",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  },
  {
    id: 3,
    name: "Diamond Medallion Necklace",
    price: "$28.00",
    oldPrice: "$48.00",
    img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80",
  },
];

export default function FeaturedProducts() {
  const addItem = useCartStore((s) => s.addItem);
  const { isWishlisted, toggle } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();

  return (
    <section
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "4rem 2rem",
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        gap: "3rem",
        alignItems: "start",
      }}
    >
      {/* Left: model photo */}
      <div style={{ position: "relative" }}>
        <img
          src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80"
          alt="Model"
          style={{
            width: "100%",
            height: "380px",
            objectFit: "cover",
            borderRadius: "12px",
            display: "block",
            opacity: 1,
          }}
        />
      </div>

      {/* Right: products */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--color-ink-soft)",
            marginBottom: "0.5rem",
          }}
        >
          Find Your Favourite
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.2rem",
            fontWeight: 400,
            marginBottom: "2rem",
            color: "var(--color-ink)",
          }}
        >
          Featured Products
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.25rem",
          }}
        >
          {products.map((p) => {
            const productId = p._id || p.id;
            const wishlisted = isWishlisted(productId);

            const handleWishlist = async (e) => {
              e.preventDefault();
              if (!isLoggedIn) return toast.error("Sign in to save items");
              await toggle(productId);
              toast.success(
                wishlisted ? "Removed from wishlist" : "Added to wishlist",
              );
            };

            const handleAdd = (e) => {
              e.preventDefault();
              const priceNum = parseFloat(p.price.replace("$", ""));
              addItem({ ...p, _id: productId, price: priceNum });
              toast.success("Added to cart");
            };

            return (
              <div
                key={productId}
                className="card"
                style={{
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                }}
              >
                {p.badge && (
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
                    {p.badge}
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
                <img
                  src={p.img}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover",
                    display: "block",
                    opacity: 1,
                  }}
                />
                <div style={{ padding: "0.75rem" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.78rem",
                      color: "var(--color-ink)",
                      fontWeight: 500,
                      marginBottom: "4px",
                    }}
                  >
                    {p.name}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 700,
                        color: "var(--color-ink)",
                      }}
                    >
                      {p.price}
                    </span>
                    {p.oldPrice && (
                      <span
                        style={{
                          fontSize: "0.75rem",
                          color: "var(--color-ink-soft)",
                          textDecoration: "line-through",
                        }}
                      >
                        {p.oldPrice}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={handleAdd}
                    className="btn btn-primary"
                    style={{
                      width: "100%",
                      fontSize: "0.75rem",
                      padding: "0.4rem 0.75rem",
                      gap: "5px",
                    }}
                  >
                    <ShoppingBag size={12} /> Add To Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          to="/shop"
          style={{
            display: "inline-block",
            marginTop: "1.5rem",
            fontFamily: "var(--font-sans)",
            fontSize: "0.82rem",
            color: "var(--color-cta-dark)",
            textDecoration: "none",
            fontWeight: 600,
            borderBottom: "1px solid var(--color-cta-dark)",
          }}
        >
          View more →
        </Link>
      </div>
    </section>
  );
}
