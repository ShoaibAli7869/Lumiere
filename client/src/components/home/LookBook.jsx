export default function Lookbook() {
  return (
    <section
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        minHeight: "520px",
      }}
    >
      {/* Left: full bleed photo */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80"
          alt="Lookbook"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity: 1,
          }}
        />
        {/* Overlay caption */}
        <div
          style={{
            position: "absolute",
            bottom: "1.5rem",
            left: "1.5rem",
            background: "rgba(255,255,255,0.92)",
            borderRadius: "8px",
            padding: "0.75rem 1rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              fontWeight: 600,
              color: "var(--color-ink)",
              marginBottom: "2px",
            }}
          >
            Delicate Silver Infinity Chain
          </p>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.78rem",
              color: "var(--color-ink-soft)",
            }}
          >
            $295.00
          </p>
        </div>
      </div>

      {/* Right: text content */}
      <div
        style={{
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem 3.5rem",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.8rem",
            fontWeight: 400,
            marginBottom: "2rem",
            color: "var(--color-ink)",
          }}
        >
          Lookbook
        </h2>
        {["• NECKLACES", "EARRINGS", "BRACELETS"].map((item, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              fontWeight: item.startsWith("•") ? 600 : 400,
              color: item.startsWith("•")
                ? "var(--color-ink)"
                : "var(--color-ink-soft)",
              marginBottom: "0.75rem",
              letterSpacing: "0.08em",
            }}
          >
            {item}
          </p>
        ))}
        <button
          className="btn btn-outline"
          style={{ marginTop: "1.5rem", alignSelf: "flex-start" }}
        >
          Shop Collection
        </button>
      </div>
    </section>
  );
}
