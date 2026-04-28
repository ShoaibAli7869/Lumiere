import { useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Trash2, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer({ open, onClose }) {
  const { items, removeItem, updateQty } = useCartStore();
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  // lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 98,
          background: "rgba(0,0,0,0.35)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "all" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
          zIndex: 99,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
          display: "flex",
          flexDirection: "column",
          boxShadow: "-4px 0 24px rgba(0,0,0,0.12)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "1.25rem 1.5rem",
            borderBottom: "1px solid rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.4rem",
              fontWeight: 400,
            }}
          >
            Cart ({items.length})
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink-soft)",
              display: "flex",
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
          {items.length === 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                gap: "1rem",
              }}
            >
              <ShoppingBag
                size={40}
                color="var(--color-ink-soft)"
                strokeWidth={1}
              />
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9rem",
                  color: "var(--color-ink-soft)",
                }}
              >
                Your cart is empty
              </p>
              <button
                onClick={onClose}
                className="btn btn-outline"
                style={{ fontSize: "0.82rem" }}
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map((item) => {
              const img =
                item.images?.[0]?.url ||
                "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=200&q=80";
              return (
                <div
                  key={item._id}
                  style={{
                    display: "flex",
                    gap: "0.9rem",
                    padding: "1rem 0",
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                  }}
                >
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
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
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.83rem",
                        fontWeight: 500,
                        color: "var(--color-ink)",
                        marginBottom: "4px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "0.95rem",
                        color: "var(--color-ink)",
                        marginBottom: "8px",
                      }}
                    >
                      ${item.price.toFixed(2)}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
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
                          onClick={() => updateQty(item._id, item.qty - 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            color: "var(--color-ink)",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            width: "24px",
                            textAlign: "center",
                            fontFamily: "var(--font-sans)",
                            fontSize: "0.8rem",
                            fontWeight: 600,
                          }}
                        >
                          {item.qty}
                        </span>
                        <button
                          onClick={() => updateQty(item._id, item.qty + 1)}
                          style={{
                            width: "28px",
                            height: "28px",
                            background: "none",
                            border: "none",
                            cursor: "pointer",
                            fontSize: "0.95rem",
                            color: "var(--color-ink)",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item._id)}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "var(--color-ink-soft)",
                      alignSelf: "flex-start",
                      padding: "2px",
                    }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div
            style={{
              padding: "1.25rem 1.5rem",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              background: "var(--color-canvas)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.85rem",
                  color: "var(--color-ink-soft)",
                }}
              >
                Total
              </span>
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.2rem",
                  fontWeight: 400,
                }}
              >
                ${total.toFixed(2)}
              </span>
            </div>
            <Link
              to="/checkout"
              onClick={onClose}
              className="btn btn-primary"
              style={{
                width: "100%",
                textDecoration: "none",
                justifyContent: "center",
                padding: "0.8rem",
                marginBottom: "0.6rem",
              }}
            >
              Checkout
            </Link>
            <Link
              to="/cart"
              onClick={onClose}
              style={{
                display: "block",
                textAlign: "center",
                fontFamily: "var(--font-sans)",
                fontSize: "0.8rem",
                color: "var(--color-ink-soft)",
                textDecoration: "none",
              }}
            >
              View full cart
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
