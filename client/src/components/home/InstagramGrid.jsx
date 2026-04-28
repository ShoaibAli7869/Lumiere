const imgs = [
  "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80",
  "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&q=80",
  "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=300&q=80",
  "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&q=80",
  "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&q=80",
];

export default function InstagramGrid() {
  return (
    <section
      style={{ background: "var(--color-canvas)", padding: "3rem 2rem 5rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.9rem",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          #@Shop by instagram
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0.75rem",
          }}
        >
          {imgs.map((src, i) => (
            <div
              key={i}
              style={{
                borderRadius: "8px",
                overflow: "hidden",
                aspectRatio: "1",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.querySelector("img").style.transform =
                  "scale(1.06)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.querySelector("img").style.transform =
                  "scale(1)")
              }
            >
              <img
                src={src}
                alt="instagram"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  opacity: 1,
                  transition: "transform 0.4s ease",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
