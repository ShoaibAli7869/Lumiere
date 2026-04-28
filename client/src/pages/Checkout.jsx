import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const emptyAddress = {
  fullName: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
};

export default function Checkout() {
  const [address, setAddress] = useState(emptyAddress);
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const onAddressChange = (e) =>
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/shop");
      return;
    }

    const empty = Object.values(address).some((v) => !v.trim());
    if (empty) return toast.error("Please fill all shipping fields");

    let message = `*New Cash on Delivery Order!*\n\n`;

    message += `*Customer Details:*\n`;
    message += `Name: ${address.fullName}\n`;
    message += `Address: ${address.address}, ${address.city}, ${address.state} ${address.zip}, ${address.country}\n\n`;

    message += `*Order Items:*\n`;
    items.forEach((item, index) => {
      const itemUrl = `${window.location.origin}/product/${item._id}`;
      message += `${index + 1}. ${item.name} (Qty: ${item.qty}) - $${(item.price * item.qty).toFixed(2)}\n`;
      message += `Link: ${itemUrl}\n`;
    });

    message += `\n*Subtotal:* $${subtotal.toFixed(2)}\n`;
    message += `*Shipping:* Free\n`;
    message += `*Total:* $${subtotal.toFixed(2)}\n\n`;
    message += `Please confirm my order.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/923129805731?text=${encodedMessage}`;

    clearCart();
    window.location.href = whatsappUrl;
  };

  return (
    <div
      style={{
        background: "var(--color-canvas)",
        minHeight: "100vh",
        padding: "3rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.4rem",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          Checkout
        </h1>
        <p
          style={{
            textAlign: "center",
            fontFamily: "var(--font-sans)",
            fontSize: "0.85rem",
            color: "var(--color-ink-soft)",
            marginBottom: "2.5rem",
          }}
        >
          Cash on Delivery via WhatsApp
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 320px",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left: Shipping form */}
          <div className="card" style={{ padding: "2rem" }}>
            <h2 style={sectionTitle}>Shipping Address</h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "1rem",
              }}
            >
              {[
                { name: "fullName", label: "Full Name", span: 2 },
                { name: "address", label: "Street Address", span: 2 },
                { name: "city", label: "City" },
                { name: "state", label: "State / Province" },
                { name: "zip", label: "ZIP / Postal Code" },
                { name: "country", label: "Country" },
              ].map((f) => (
                <div
                  key={f.name}
                  style={{
                    gridColumn: f.span ? `span ${f.span}` : undefined,
                  }}
                >
                  <label style={labelStyle}>{f.label}</label>
                  <input
                    name={f.name}
                    value={address[f.name]}
                    onChange={onAddressChange}
                    required
                    style={inputStyle}
                  />
                </div>
              ))}
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="btn btn-primary"
              style={{ marginTop: "2rem", width: "100%", padding: "0.85rem" }}
            >
              Confirm Order via WhatsApp
            </button>
          </div>

          {/* Right: order summary */}
          <div
            className="card"
            style={{ padding: "1.5rem", position: "sticky", top: "100px" }}
          >
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 400,
                marginBottom: "1.25rem",
              }}
            >
              Summary
            </h3>
            {items.map((i) => (
              <div
                key={i._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.6rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {i.name} × {i.qty}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    color: "var(--color-ink)",
                  }}
                >
                  ${(i.price * i.qty).toFixed(2)}
                </span>
              </div>
            ))}
            <div
              style={{
                borderTop: "1px solid rgba(0,0,0,0.1)",
                paddingTop: "1rem",
                marginTop: "1rem",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "0.5rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  Shipping
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.82rem",
                    color: "#2a7a2a",
                    fontWeight: 600,
                  }}
                >
                  Free
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "0.75rem",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--color-ink)",
                  }}
                >
                  Total
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "1.2rem",
                  }}
                >
                  ${subtotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const sectionTitle = {
  fontFamily: "var(--font-serif)",
  fontSize: "1.5rem",
  fontWeight: 400,
  marginBottom: "1.5rem",
  color: "var(--color-ink)",
};
const labelStyle = {
  display: "block",
  fontFamily: "var(--font-sans)",
  fontSize: "0.75rem",
  fontWeight: 600,
  letterSpacing: "0.05em",
  color: "var(--color-ink)",
  marginBottom: "0.4rem",
};
const inputStyle = {
  width: "100%",
  padding: "0.65rem 0.9rem",
  border: "1px solid rgba(0,0,0,0.15)",
  borderRadius: "8px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.88rem",
  color: "var(--color-ink)",
  background: "#fff",
  outline: "none",
};
