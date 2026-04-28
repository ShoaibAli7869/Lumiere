import { Link } from "react-router-dom";

const posts = [
  {
    date: "22 Jan 2022",
    title: "Christmas Gift Guide",
    img: "https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80",
  },
  {
    date: "12 Aug 2023",
    title: "How to Style a Cuff",
    img: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&q=80",
  },
  {
    date: "25 Jan 2023",
    title: "Selective Styles Help Your Look",
    img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
  },
  {
    date: "14 Dec 2023",
    title: "Exclusive Look",
    img: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&q=80",
  },
];

export default function Journal() {
  return (
    <section
      style={{ background: "var(--color-canvas)", padding: "5rem 2rem" }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "2.5rem",
            fontWeight: 400,
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          Read Journal
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "1.5rem",
          }}
        >
          {posts.map((p) => (
            <article key={p.title} style={{ cursor: "pointer" }}>
              <div
                style={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  marginBottom: "0.85rem",
                  background: "var(--color-canvas-alt)",
                }}
              >
                <img
                  src={p.img}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    display: "block",
                    opacity: 1,
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.04)")
                  }
                  onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                />
              </div>
              <p
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  color: "var(--color-ink-soft)",
                  marginBottom: "0.35rem",
                }}
              >
                By Lumiere • {p.date}
              </p>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1rem",
                  fontWeight: 400,
                  marginBottom: "0.5rem",
                  color: "var(--color-ink)",
                }}
              >
                {p.title}
              </h3>
              <Link
                to="/"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.78rem",
                  color: "var(--color-cta-dark)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
