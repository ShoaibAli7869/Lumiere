import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// Decorative botanical SVG (matches the dandelion/floral element in the design)
const BotanicalSVG = () => (
  <svg
    width="120"
    height="120"
    viewBox="0 0 120 120"
    fill="none"
    style={{ opacity: 0.25 }}
  >
    <circle cx="60" cy="60" r="2" fill="#8B6914" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 60 60)`}>
        <line
          x1="60"
          y1="58"
          x2="60"
          y2="20"
          stroke="#8B6914"
          strokeWidth="0.8"
        />
        <circle cx="60" cy="18" r="2.5" fill="#C9A84C" />
        <line
          x1="60"
          y1="38"
          x2="52"
          y2="28"
          stroke="#8B6914"
          strokeWidth="0.5"
        />
        <circle cx="51" cy="27" r="1.5" fill="#C9A84C" opacity="0.6" />
      </g>
    ))}
  </svg>
);

const SparkSVG = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 0L9 7L16 8L9 9L8 16L7 9L0 8L7 7L8 0Z" fill="#C9A84C" />
  </svg>
);

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(24px)";
    requestAnimationFrame(() => {
      el.style.transition = "opacity 0.9s ease, transform 0.9s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }, []);

  return (
    <section
      style={{
        background: "var(--color-canvas)",
        minHeight: "88vh",
        display: "flex",
        alignItems: "center",
        padding: "3rem 2rem",
        position: "relative",
        overflow: "hidden",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      {/* Decorative botanical top-right */}
      <div
        style={{
          position: "absolute",
          top: "1.5rem",
          right: "8rem",
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <BotanicalSVG />
      </div>

      {/* Spark accents */}
      <div
        style={{ position: "absolute", top: "35%", right: "45%", zIndex: 2 }}
      >
        <SparkSVG />
      </div>
      <div
        style={{
          position: "absolute",
          top: "18%",
          right: "38%",
          zIndex: 2,
          opacity: 0.6,
          transform: "scale(0.7)",
        }}
      >
        <SparkSVG />
      </div>

      <div
        ref={heroRef}
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
          width: "100%",
        }}
      >
        {/* Left — text */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.8rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              color: "var(--color-cta-dark)",
              marginBottom: "1.25rem",
            }}
          >
            Fine Jewelry Collection
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.6rem, 5vw, 4.2rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              color: "var(--color-ink)",
              marginBottom: "1.25rem",
              letterSpacing: "-0.01em",
            }}
          >
            Classic &amp; Elegant <br />
            <em style={{ fontStyle: "italic" }}>Silver Jewelry</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.95rem",
              color: "var(--color-ink-soft)",
              lineHeight: 1.7,
              maxWidth: "360px",
              marginBottom: "2rem",
            }}
          >
            Check out our i adore you jewellery selection for the very best in
            unique or custom, handmade pieces from our shops.
          </p>
          <Link
            to="/shop"
            className="btn btn-primary"
            style={{ textDecoration: "none" }}
          >
            Shop Now
          </Link>
        </div>

        {/* Right — circular model photo */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* Decorative circle ring */}
          <div
            style={{
              width: "clamp(300px, 40vw, 460px)",
              height: "clamp(300px, 40vw, 460px)",
              borderRadius: "50%",
              border: "1px solid rgba(139,105,20,0.35)",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) scale(1.08)",
            }}
          />
          {/* Model photo */}
          <div
            style={{
              width: "clamp(300px, 40vw, 460px)",
              height: "clamp(300px, 40vw, 460px)",
              borderRadius: "50%",
              overflow: "hidden",
              background: "var(--color-canvas-alt)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=600&q=80"
              alt="Model wearing silver jewelry"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 1,
              }}
            />
          </div>
        </div>
      </div>

      {/* Mobile: stack */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          .hero-grid p {
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </section>
  );
}
