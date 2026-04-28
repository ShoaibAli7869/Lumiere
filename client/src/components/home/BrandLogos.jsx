const brands = ["PAINDIE", "VERONAS", "SWAROVSKI", "DIAMOND", "MANGO"];

export default function BrandLogos() {
  return (
    <div
      style={{
        background: "#fff",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        padding: "1.75rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        {brands.map((b) => (
          <span
            key={b}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.05rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              color: "rgba(0,0,0,0.35)",
              userSelect: "none",
            }}
          >
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
