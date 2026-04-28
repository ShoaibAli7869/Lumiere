import { Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--color-band-dark)",
        color: "#fff",
        padding: "4rem 2rem 2rem",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.5fr 1fr 1fr 1fr",
            gap: "3rem",
            marginBottom: "3rem",
          }}
        >
          {/* Newsletter */}
          <div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.6rem",
                fontWeight: 400,
                marginBottom: "0.75rem",
              }}
            >
              Sign up for our Newsletter
            </h3>
            <p
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.82rem",
                color: "var(--color-on-dark-soft)",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
              }}
            >
              Subscribe to get special offers, free giveaways, and
              once-in-a-lifetime deals.
            </p>
            <div
              style={{
                display: "flex",
                border: "1px solid rgba(255,255,255,0.3)",
                borderRadius: "50px",
                overflow: "hidden",
              }}
            >
              <input
                type="email"
                placeholder="Email Address"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  padding: "0.6rem 1.1rem",
                  color: "#fff",
                  fontSize: "0.83rem",
                  fontFamily: "var(--font-sans)",
                }}
              />
              <button
                style={{
                  background: "var(--color-cta-dark)",
                  border: "none",
                  cursor: "pointer",
                  padding: "0 1rem",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>

          {/* Lumiere */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 400,
                marginBottom: "1rem",
              }}
            >
              Lumiere
            </h4>
            {[
              "Bellabeat",
              "Our Producers",
              "Sitemap",
              "Terms & Conditions",
              "Privacy Policy",
            ].map((l) => (
              <Link
                key={l}
                to="/"
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  color: "var(--color-on-dark-soft)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                }}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* Customer Services */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 400,
                marginBottom: "1rem",
              }}
            >
              Customer Services
            </h4>
            {[
              "Contact Us",
              "Track Your Order",
              "Product Care & Repair",
              "Book an Appointment",
              "Frequently Asked Question",
              "Shipping & Returns",
            ].map((l) => (
              <Link
                key={l}
                to="/"
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  color: "var(--color-on-dark-soft)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                }}
              >
                {l}
              </Link>
            ))}
          </div>

          {/* About Us */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.2rem",
                fontWeight: 400,
                marginBottom: "1rem",
              }}
            >
              About Us
            </h4>
            {[
              "Bellabeat",
              "Our Producers",
              "Sitemap",
              "Terms & Conditions",
              "Privacy Policy",
            ].map((l) => (
              <Link
                key={l}
                to="/"
                style={{
                  display: "block",
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.82rem",
                  color: "var(--color-on-dark-soft)",
                  textDecoration: "none",
                  marginBottom: "0.6rem",
                }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "1.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              color: "var(--color-on-dark-soft)",
            }}
          >
            Copyright 2023 Fashion. All rights reserved
          </p>
          {/* Payment icons placeholder */}
          <div style={{ display: "flex", gap: "8px" }}>
            {["VISA", "MC", "PP", "GP"].map((p) => (
              <span
                key={p}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  borderRadius: "4px",
                  padding: "2px 8px",
                  fontSize: "9px",
                  fontWeight: 700,
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
