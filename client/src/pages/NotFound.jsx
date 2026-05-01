import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "../animations/gsap";

export default function NotFound() {
  const numRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      numRef.current,
      { opacity: 0, scale: 0.7, rotate: -8 },
      { opacity: 1, scale: 1, rotate: 0, duration: 1.1, ease: "expo.out" },
    );
    gsap.fromTo(
      ".nf-content",
      { y: 32, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, delay: 0.3, ease: "power3.out" },
    );
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-canvas)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px",
        textAlign: "center",
      }}
    >
      {/* Decorative gold ring */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        <div
          ref={numRef}
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(120px, 22vw, 200px)",
            color: "var(--color-canvas-alt)",
            lineHeight: 1,
            userSelect: "none",
            letterSpacing: "-0.04em",
          }}
        >
          404
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "clamp(80px, 14vw, 130px)",
              height: "clamp(80px, 14vw, 130px)",
              borderRadius: "50%",
              border: "2px solid var(--color-cta)",
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      <div className="nf-content" style={{ maxWidth: 400 }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(26px, 4vw, 36px)",
            color: "var(--color-ink)",
            marginBottom: 12,
          }}
        >
          Page Not Found
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            color: "var(--color-ink-soft)",
            lineHeight: 1.7,
            marginBottom: 32,
          }}
        >
          The piece you're looking for may have moved or no longer exists. Let's
          get you back to something beautiful.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link to="/" className="btn btn-primary">
            Back to Home
          </Link>
          <Link to="/shop" className="btn btn-outline">
            Browse Collection
          </Link>
        </div>
      </div>
    </div>
  );
}
