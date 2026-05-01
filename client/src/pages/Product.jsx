import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ShoppingBag, Heart, ChevronRight } from "lucide-react";
import { useProduct } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import ProductGallery from "@/components/product/ProductGallery";
import ProductReviews from "@/components/product/ProductReviews";
import toast from "react-hot-toast";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { Helmet } from "react-helmet-async";
import { ProductDetailSkeleton } from "../components/ui/Skeleton";

export default function Product() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);
  const addItem = useCartStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  const { isWishlisted, toggle } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();
  const wishlisted = product ? isWishlisted(product._id) : false;

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) return toast.error("Sign in to save items");
    await toggle(product._id);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
  };

  if (loading) return <ProductDetailSkeleton />;

  if (error || !product)
    return (
      <div style={{ textAlign: "center", padding: "8rem 2rem" }}>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            color: "var(--color-ink-soft)",
          }}
        >
          Product not found
        </p>
        <Link
          to="/shop"
          className="btn btn-outline"
          style={{ marginTop: "1rem", textDecoration: "none" }}
        >
          Back to Shop
        </Link>
      </div>
    );

  const hasDiscount = product.comparePrice > product.price;
  const inStock = product.stock > 0;

  const handleAdd = () => {
    addItem(product, qty);
    toast.success(`${product.name} added to cart`);
  };
  // Dynamic — use product data:
  <Helmet>
    <title>{product ? `${product.name} — Lumiere` : "Lumiere"}</title>
    <meta name="description" content={product?.description?.slice(0, 155)} />
    {product?.images?.[0] && (
      <meta property="og:image" content={product.images[0].url} />
    )}
  </Helmet>;
  return (
    <div style={{ background: "var(--color-canvas)", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div
        style={{ background: "var(--color-band-dark)", padding: "1rem 2rem" }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          {["Shop", product.category?.name, product.name].map(
            (crumb, i, arr) => (
              <span
                key={i}
                style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    color:
                      i === arr.length - 1
                        ? "#fff"
                        : "var(--color-on-dark-soft)",
                  }}
                >
                  {crumb}
                </span>
                {i < arr.length - 1 && (
                  <ChevronRight size={12} color="var(--color-on-dark-soft)" />
                )}
              </span>
            ),
          )}
        </div>
      </div>

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          {/* Gallery */}
          <ProductGallery images={product.images} />

          {/* Details */}
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
              {product.category?.name}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2.4rem",
                fontWeight: 400,
                color: "var(--color-ink)",
                marginBottom: "1rem",
                lineHeight: 1.2,
              }}
            >
              {product.name}
            </h1>

            {/* Price */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.9rem",
                  fontWeight: 400,
                  color: "var(--color-ink)",
                }}
              >
                ${product.price.toFixed(2)}
              </span>
              {hasDiscount && (
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "1rem",
                    color: "var(--color-ink-soft)",
                    textDecoration: "line-through",
                  }}
                >
                  ${product.comparePrice.toFixed(2)}
                </span>
              )}
              {hasDiscount && (
                <span
                  style={{
                    background: "var(--color-cta-dark)",
                    color: "#fff",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    padding: "2px 10px",
                    borderRadius: "50px",
                  }}
                >
                  Save ${(product.comparePrice - product.price).toFixed(2)}
                </span>
              )}
            </div>

            {/* Description */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.92rem",
                color: "var(--color-ink-soft)",
                lineHeight: 1.8,
                marginBottom: "2rem",
              }}
            >
              {product.description}
            </p>

            {/* Material */}
            {product.material && (
              <div
                style={{
                  marginBottom: "1.75rem",
                  padding: "1rem",
                  background: "#fff",
                  borderRadius: "8px",
                  border: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.78rem",
                    fontWeight: 600,
                    color: "var(--color-ink)",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  Material:
                </span>{" "}
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.88rem",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {product.material}
                </span>
              </div>
            )}

            {/* Stock */}
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: inStock ? "#2a7a2a" : "var(--color-error)",
                fontWeight: 600,
                marginBottom: "1.5rem",
              }}
            >
              {inStock
                ? `In Stock (${product.stock} available)`
                : "Out of Stock"}
            </p>

            {/* Qty + Add */}
            {inStock && (
              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                {/* Qty stepper */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "1px solid rgba(0,0,0,0.15)",
                    borderRadius: "50px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    style={{
                      width: "40px",
                      height: "42px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      width: "36px",
                      textAlign: "center",
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.9rem",
                      fontWeight: 600,
                    }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() =>
                      setQty((q) => Math.min(product.stock, q + 1))
                    }
                    style={{
                      width: "40px",
                      height: "42px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "1.1rem",
                      color: "var(--color-ink)",
                    }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAdd}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: "0.75rem", gap: "8px" }}
                >
                  <ShoppingBag size={16} /> Add To Cart
                </button>

                <button
                  onClick={handleWishlist}
                  style={{
                    width: "46px",
                    height: "46px",
                    borderRadius: "50%",
                    border: "1px solid rgba(0,0,0,0.15)",
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <Heart
                    size={18}
                    fill={wishlisted ? "#C82014" : "none"}
                    color={wishlisted ? "#C82014" : "var(--color-ink-soft)"}
                  />
                </button>
              </div>
            )}

            {/* Trust badges */}
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                marginTop: "2rem",
                padding: "1rem 0",
                borderTop: "1px solid rgba(0,0,0,0.08)",
              }}
            >
              {["Free Shipping", "30-Day Returns", "Secure Payment"].map(
                (b) => (
                  <span
                    key={b}
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "0.75rem",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    ✓ {b}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        {product && <ProductReviews productId={product._id} />}
      </div>
    </div>
  );
}
