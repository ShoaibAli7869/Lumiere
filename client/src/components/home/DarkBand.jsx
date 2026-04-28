export default function DarkBand() {
  return (
    <section
      style={{
        background: "var(--color-band-dark)",
        padding: "5rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "3rem",
          alignItems: "center",
        }}
      >
        {/* Photo */}
        <img
          src="https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=700&q=80"
          alt="Jewelry on dark"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
            opacity: 1,
          }}
        />
        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.4rem",
              color: "#fff",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            Keep Shining With Jewellery
          </h2>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--color-on-dark-soft)",
              lineHeight: 1.7,
              marginBottom: "1.75rem",
              maxWidth: "340px",
              margin: "0 auto 1.75rem",
            }}
          >
            Discover The Perfect Treasure That Will Last A Lifetime. Handmade
            Jewellery, Exclusively For Your Daily Use.
          </p>
          <button className="btn btn-outline-white">More about us</button>
        </div>
      </div>
    </section>
  );
}
