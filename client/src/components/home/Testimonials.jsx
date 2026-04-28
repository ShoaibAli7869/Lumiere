import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Montluc claim to offer the finest diamond jewellery you can buy direct from the maker. I did my research, compared specifications with some of the big brands and now I will never walk into a store again.",
    name: "ALEXANDRA JERSELIUS",
    avatar: "https://i.pravatar.cc/48?img=47",
  },
  {
    quote:
      "Absolutely stunning pieces. The craftsmanship is impeccable and the customer service was beyond my expectations. I'll be a customer for life.",
    name: "SOPHIA MARCHETTI",
    avatar: "https://i.pravatar.cc/48?img=32",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section style={{ background: "#fff", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-ink-soft)",
            marginBottom: "0.75rem",
          }}
        >
          Client Testimonials
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.4rem",
            fontWeight: 400,
            marginBottom: "2.5rem",
          }}
        >
          Our Happy Clients
        </h2>

        <div style={{ position: "relative", padding: "0 3rem" }}>
          <button
            onClick={() =>
              setIdx((idx - 1 + testimonials.length) % testimonials.length)
            }
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink-soft)",
            }}
          >
            <ChevronLeft size={20} />
          </button>

          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: "var(--color-ink-soft)",
              marginBottom: "2rem",
            }}
          >
            {t.quote}
          </p>

          <img
            src={t.avatar}
            alt={t.name}
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              margin: "0 auto 0.75rem",
              display: "block",
              opacity: 1,
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.72rem",
              letterSpacing: "0.12em",
              color: "var(--color-ink-soft)",
            }}
          >
            — {t.name}
          </p>

          <button
            onClick={() => setIdx((idx + 1) % testimonials.length)}
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink-soft)",
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
