import { useEffect, useRef, useState } from "react";

const injectFonts = () => {
  if (document.getElementById("cg-fonts")) return;
  const link = document.createElement("link");
  link.id = "cg-fonts";
  link.rel = "stylesheet";
  link.href =
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap";
  document.head.appendChild(link);
};

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return visible;
}

const STATS = [
  { value: "12K+", label: "Pieces Crafted" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "40yr", label: "Heritage" },
];

export default function DarkBand() {
  useEffect(() => {
    injectFonts();
  }, []);

  const sectionRef = useRef(null);
  const visible = useInView(sectionRef);
  const [btnHovered, setBtnHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#0a0805",
        padding: "clamp(3.5rem,8vw,6.5rem) clamp(1rem,5vw,2.5rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gold orb — pure CSS, no image */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "clamp(280px,45vw,520px)",
          height: "clamp(280px,45vw,520px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,169,110,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "-15%",
          left: "-8%",
          width: "clamp(200px,30vw,360px)",
          height: "clamp(200px,30vw,360px)",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,169,110,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%,380px), 1fr))",
          gap: "clamp(2.5rem,6vw,5rem)",
          alignItems: "center",
        }}
      >
        {/* ── Image column ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(-32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          {/* Decorative frame offset */}
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
            }}
          >
            {/* Gold corner accent — top left */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-10px",
                left: "-10px",
                width: "40px",
                height: "40px",
                borderTop: "1.5px solid rgba(200,169,110,0.6)",
                borderLeft: "1.5px solid rgba(200,169,110,0.6)",
                zIndex: 2,
                borderRadius: "1px 0 0 0",
              }}
            />
            {/* Gold corner accent — bottom right */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                bottom: "-10px",
                right: "-10px",
                width: "40px",
                height: "40px",
                borderBottom: "1.5px solid rgba(200,169,110,0.6)",
                borderRight: "1.5px solid rgba(200,169,110,0.6)",
                zIndex: 2,
                borderRadius: "0 0 1px 0",
              }}
            />

            <div
              style={{
                borderRadius: "3px",
                overflow: "hidden",
                position: "relative",
              }}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=60"
                alt="Handcrafted jewellery on dark velvet"
                loading="lazy"
                decoding="async"
                width="800"
                height="560"
                style={{
                  width: "100%",
                  height: "clamp(260px,38vw,420px)",
                  objectFit: "cover",
                  display: "block",
                  transform: imgHovered ? "scale(1.05)" : "scale(1)",
                  transition:
                    "transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
                  willChange: "transform",
                }}
              />
              {/* Subtle inner vignette */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(10,8,5,0.25) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Stats row below image */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1px",
              marginTop: "clamp(1.2rem,3vw,2rem)",
              border: "1px solid rgba(200,169,110,0.15)",
              borderRadius: "3px",
              overflow: "hidden",
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "clamp(0.8rem,2vw,1.2rem) 0.5rem",
                  textAlign: "center",
                  background: "rgba(200,169,110,0.04)",
                  borderRight:
                    i < STATS.length - 1
                      ? "1px solid rgba(200,169,110,0.15)"
                      : "none",
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.6s ease ${300 + i * 100}ms, transform 0.6s ease ${300 + i * 100}ms`,
                }}
              >
                <p
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(1.3rem,3vw,1.75rem)",
                    fontWeight: 400,
                    color: "#c8a96e",
                    margin: "0 0 2px",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "clamp(0.6rem,1.2vw,0.68rem)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(245,240,232,0.35)",
                    margin: 0,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Text column ── */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateX(0)" : "translateX(32px)",
            transition: "opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s",
          }}
        >
          {/* Eyebrow */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              marginBottom: "1.5rem",
            }}
          >
            <div
              style={{
                height: "1px",
                width: "36px",
                background: "rgba(200,169,110,0.5)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(200,169,110,0.7)",
              }}
            >
              Our Story
            </span>
          </div>

          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem,5vw,3.2rem)",
              fontWeight: 300,
              fontStyle: "italic",
              color: "#f5f0e8",
              margin: "0 0 clamp(1rem,2.5vw,1.5rem)",
              lineHeight: 1.15,
              letterSpacing: "-0.01em",
            }}
          >
            Keep Shining With
            <br />
            <em style={{ fontStyle: "normal", color: "#c8a96e" }}>Jewellery</em>
          </h2>

          {/* Decorative hairline */}
          <div
            style={{
              width: "48px",
              height: "1px",
              background: "rgba(200,169,110,0.35)",
              marginBottom: "clamp(1rem,2.5vw,1.5rem)",
            }}
          />

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.82rem,1.5vw,0.92rem)",
              fontWeight: 300,
              color: "rgba(245,240,232,0.5)",
              lineHeight: 1.85,
              marginBottom: "clamp(1rem,2.5vw,1.5rem)",
              maxWidth: "400px",
            }}
          >
            Discover the perfect treasure that will last a lifetime. Each piece
            is handcrafted with devotion — made exclusively for those who carry
            elegance in their every day.
          </p>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "clamp(0.82rem,1.5vw,0.92rem)",
              fontWeight: 300,
              color: "rgba(245,240,232,0.35)",
              lineHeight: 1.85,
              marginBottom: "clamp(1.5rem,3.5vw,2.5rem)",
              maxWidth: "360px",
            }}
          >
            Rooted in four decades of heritage, our artisans pour intention into
            every clasp, setting, and curve.
          </p>

          {/* CTA */}
          <button
            onMouseEnter={() => setBtnHovered(true)}
            onMouseLeave={() => setBtnHovered(false)}
            aria-label="Learn more about us"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 400,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: btnHovered ? "#0a0805" : "#c8a96e",
              background: btnHovered ? "#c8a96e" : "transparent",
              border: "1px solid rgba(200,169,110,0.6)",
              borderRadius: "2px",
              padding: "14px 36px",
              cursor: "pointer",
              transition:
                "background 0.3s ease, color 0.3s ease, border-color 0.3s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            More About Us
            <span
              style={{
                display: "inline-block",
                transform: btnHovered ? "translateX(4px)" : "translateX(0)",
                transition: "transform 0.3s ease",
              }}
            >
              →
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
