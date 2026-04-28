import { useState } from "react";

const tabs = ["All", "Necklace", "Bracelets", "Earrings", "Rings"];

const images = [
  {
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=600&q=80",
    alt: "Bracelet",
    span: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&q=80",
    alt: "Necklace",
  },
  {
    src: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&q=80",
    alt: "Earrings",
  },
  {
    src: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80",
    alt: "Ring",
  },
];

export default function CollectionGrid() {
  const [active, setActive] = useState("All");

  return (
    <section style={{ background: "#fff", padding: "5rem 2rem" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.5rem",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "1.25rem",
          }}
        >
          Exquisite Collection
        </h2>

        {/* Category tabs */}
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "center",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                fontWeight: active === t ? 600 : 400,
                color:
                  active === t ? "var(--color-ink)" : "var(--color-ink-soft)",
                borderBottom:
                  active === t
                    ? "2px solid var(--color-cta-dark)"
                    : "2px solid transparent",
                paddingBottom: "4px",
                transition: "all 0.2s",
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Bento grid — matches design: 1 large left + 3 right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridTemplateRows: "auto auto",
            gap: "0.75rem",
          }}
        >
          <div
            style={{
              gridRow: "1 / 3",
              borderRadius: "12px",
              overflow: "hidden",
              background: "var(--color-canvas-alt)",
            }}
          >
            <img
              src={images[0].src}
              alt={images[0].alt}
              style={{
                width: "100%",
                height: "100%",
                minHeight: "480px",
                objectFit: "cover",
                display: "block",
                opacity: 1,
              }}
            />
          </div>
          <div
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              background: "var(--color-canvas-alt)",
            }}
          >
            <img
              src={images[1].src}
              alt={images[1].alt}
              style={{
                width: "100%",
                height: "230px",
                objectFit: "cover",
                display: "block",
                opacity: 1,
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.75rem",
            }}
          >
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                background: "var(--color-canvas-alt)",
              }}
            >
              <img
                src={images[2].src}
                alt={images[2].alt}
                style={{
                  width: "100%",
                  height: "230px",
                  objectFit: "cover",
                  display: "block",
                  opacity: 1,
                }}
              />
            </div>
            <div
              style={{
                borderRadius: "12px",
                overflow: "hidden",
                background: "var(--color-canvas-alt)",
              }}
            >
              <img
                src={images[3].src}
                alt={images[3].alt}
                style={{
                  width: "100%",
                  height: "230px",
                  objectFit: "cover",
                  display: "block",
                  opacity: 1,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
