import { Link } from "react-router-dom";
import { Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function Cart() {
  const { items, removeItem, updateQty, clearCart } = useCartStore();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  if (items.length === 0)
    return (
      <div
        style={{
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
        }}
      >
        <ShoppingBag size={48} color="var(--color-ink-soft)" strokeWidth={1} />
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--color-ink)",
          }}
        >
          Your cart is empty
        </h2>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.9rem",
            color: "var(--color-ink-soft)",
          }}
        >
          Discover our fine jewelry collection
        </p>
        <Link
          to="/shop"
          className="btn btn-primary"
          style={{ textDecoration: "none" }}
        >
          Shop Now
        </Link>
      </div>
    );

  return (
    <div
      style={{
        background: "var(--color-canvas)",
        minHeight: "100vh",
        padding: "3rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.4rem",
            fontWeight: 400,
            marginBottom: "2.5rem",
          }}
        >
          Shopping Cart
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Items */}
          <div>
            {/* Header */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr 1fr 40px",
                gap: "1rem",
                padding: "0 0 0.75rem",
                borderBottom: "1px solid rgba(0,0,0,0.1)",
              }}
            >
              {["Product", "Quantity", "Price", ""].map((h) => (
                <span
                  key={h}
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>

            {items.map((item) => {
              const img =
                item.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80";
              return (
                <div
                  key={item._id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr 40px",
                    gap: "1rem",
                    alignItems: "center",
                    padding: "1.25rem 0",
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Product */}
                  <div
                    style={{
                      display: "flex",
                      gap: "1rem",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "72px",
                        height: "72px",
                        borderRadius: "8px",
                        overflow: "hidden",
                        flexShrink: 0,
                        background: "var(--color-canvas-alt)",
                      }}
                    >
                      <img
                        src={img}
                        alt={item.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: 1,
                        }}
                      />
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: "0.88rem",
                          fontWeight: 500,
                          color: "var(--color-ink)",
                          marginBottom: "3px",
                        }}
                      >
                        {item.name}
                      </p>
                      {item.material && (
                        <p
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.75rem",
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          {item.material}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Qty stepper */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      border: "1px solid rgba(0,0,0,0.15)",
                      borderRadius: "50px",
                      width: "fit-content",
                      overflow: "hidden",
                    }}
                  >
                    <button
                      onClick={() => updateQty(item._id, item.qty - 1)}
                      style={{
                        width: "32px",
                        height: "34px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1rem",
                        color: "var(--color-ink)",
                      }}
                    >
                      −
                    </button>
                    <span
                      style={{
                        width: "28px",
                        textAlign: "center",
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                      }}
                    >
                      {item.qty}
                    </span>
                    <button
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      style={{
                        width: "32px",
                        height: "34px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "1rem",
                        color: "var(--color-ink)",
                      }}
                    >
                      +
                    </button>
                  </div>

                  {/* Price */}
                  <span
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1rem",
                      fontWeight: 400,
                      color: "var(--color-ink)",
                    }}
                  >
                    ${(item.price * item.qty).toFixed(2)}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeItem(item._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-ink-soft)",
                      display: "flex",
                      alignItems: "center",
                      padding: "4px",
                    }}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              );
            })}

            <button
              onClick={clearCart}
              style={{
                marginTop: "1rem",
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                color: "var(--color-ink-soft)",
                textDecoration: "underline",
              }}
            >
              Clear cart
            </button>
          </div>

          {/* Summary */}
          <div
            className="card"
            style={{ padding: "1.75rem", position: "sticky", top: "100px" }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontWeight: 400,
                marginBottom: "1.5rem",
              }}
            >
              Order Summary
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginBottom: "1.5rem",
              }}
            >
              <Row label="Subtotal" value={`$${total.toFixed(2)}`} />
              <Row
                label="Shipping"
                value="Free"
                valueStyle={{ color: "#2a7a2a", fontWeight: 600 }}
              />
              <div
                style={{
                  borderTop: "1px solid rgba(0,0,0,0.1)",
                  paddingTop: "0.75rem",
                }}
              >
                <Row label="Total" value={`$${total.toFixed(2)}`} bold />
              </div>
            </div>

            <Link
              to="/checkout"
              className="btn btn-primary"
              style={{
                width: "100%",
                textDecoration: "none",
                justifyContent: "center",
                padding: "0.8rem",
              }}
            >
              Proceed to Checkout
            </Link>
            <Link
              to="/shop"
              style={{
                display: "block",
                textAlign: "center",
                marginTop: "0.85rem",
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: "var(--color-ink-soft)",
                textDecoration: "none",
              }}
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold, valueStyle = {} }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: "0.85rem",
          color: "var(--color-ink-soft)",
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: bold ? "var(--font-serif)" : "var(--font-sans)",
          fontSize: bold ? "1.1rem" : "0.88rem",
          fontWeight: bold ? 400 : 500,
          color: "var(--color-ink)",
          ...valueStyle,
        }}
      >
        {value}
      </span>
    </div>
  );
}
