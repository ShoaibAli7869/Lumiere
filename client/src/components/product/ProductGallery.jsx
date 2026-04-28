import { useState } from "react";

export default function ProductGallery({ images }) {
  const [active, setActive] = useState(0);
  const fallback =
    "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&q=80";
  const imgs = images?.length ? images : [{ url: fallback }];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Main image */}
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          background: "var(--color-canvas-alt)",
          aspectRatio: "1",
        }}
      >
        <img
          src={imgs[active]?.url || fallback}
          alt="product"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: 1,
          }}
        />
      </div>
      {/* Thumbnails */}
      {imgs.length > 1 && (
        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          {imgs.map((img, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "8px",
                overflow: "hidden",
                cursor: "pointer",
                border:
                  active === i
                    ? "2px solid var(--color-cta-dark)"
                    : "2px solid transparent",
                background: "var(--color-canvas-alt)",
              }}
            >
              <img
                src={img.url}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: 1,
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
