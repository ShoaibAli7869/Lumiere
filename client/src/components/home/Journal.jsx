import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

/* ─── Data ───────────────────────────────────────────────── */
const posts = [
  {
    date: "22 Jan 2022",
    slug: "christmas-gift-guide",
    category: "Gift Guides",
    title: "Christmas Gift Guide",
    excerpt:
      "The most cherished gifts aren't the largest — they're the most considered.",
    img: "https://images.unsplash.com/photo-1597006354775-2955b15ec026?w=700&auto=format&fit=crop&q=75",
    featured: true,
  },
  {
    date: "12 Aug 2023",
    slug: "how-to-style-a-cuff",
    category: "Style",
    title: "How to Style a Cuff",
    excerpt:
      "One bracelet. Infinite combinations. Here's how to wear it every day.",
    img: "https://images.unsplash.com/photo-1716512064598-4536d086736c?w=600&auto=format&fit=crop&q=75",
    featured: false,
  },
  {
    date: "25 Jan 2023",
    slug: "selective-styles",
    category: "Lookbook",
    title: "Selective Styles Help Your Look",
    excerpt:
      "Less is more — when you choose with intention, every piece speaks.",
    img: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&auto=format&fit=crop&q=75",
    featured: false,
  },
  {
    date: "14 Dec 2023",
    slug: "exclusive-look",
    category: "Editorial",
    title: "An Exclusive Look",
    excerpt:
      "Behind the scenes of our winter editorial shoot — raw, unfiltered.",
    img: "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=600&auto=format&fit=crop&q=75",
    featured: false,
  },
];

/* ─── Styles ─────────────────────────────────────────────── */
const J_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink:         #1a1612;
    --ink-soft:    #5a4f45;
    --gold:        #C9A84C;
    --gold-light:  #e8d49a;
    --cream:       #fdf8f1;
    --canvas-alt:  #f3ede3;
    --border-gold: rgba(201,168,76,0.28);
  }

  @keyframes j-fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes j-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }

  /* ── section ── */
  .j-section {
    background: var(--ink);
    padding: 6rem 5vw 6.5rem;
    position: relative;
    overflow: hidden;
  }

  /* ambient light */
  .j-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 20% 0%,   rgba(201,168,76,0.07) 0%, transparent 65%),
      radial-gradient(ellipse 40% 40% at 85% 100%, rgba(201,168,76,0.05) 0%, transparent 55%);
    pointer-events: none;
  }
  /* grain texture overlay */
  .j-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.35;
  }

  .j-inner {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  .j-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 3rem;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .j-header-left {
    animation: j-fadeUp 0.7s ease both 0.1s;
  }
  .j-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.7rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .j-eyebrow::after {
    content: '';
    display: inline-block;
    width: 32px;
    height: 0.5px;
    background: var(--border-gold);
  }
  .j-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.2rem, 3.8vw, 3.4rem);
    font-weight: 300;
    color: var(--cream);
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .j-heading em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: j-shimmer 5s linear 1s infinite;
  }

  .j-header-link {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(253,248,241,0.6);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border-bottom: 0.5px solid rgba(253,248,241,0.2);
    padding-bottom: 2px;
    transition: color 0.25s, gap 0.25s, border-color 0.25s;
    white-space: nowrap;
    animation: j-fadeUp 0.7s ease both 0.2s;
    align-self: flex-end;
    margin-bottom: 0.25rem;
  }
  .j-header-link:hover {
    color: var(--gold);
    gap: 13px;
    border-color: var(--gold);
  }

  /* ── grid: 1 featured wide + 3 standard ── */
  .j-grid {
    display: grid;
    grid-template-columns: 1.5fr repeat(3, 1fr);
    gap: 1px;
    background: rgba(201,168,76,0.12);
    border: 0.5px solid rgba(201,168,76,0.12);
  }

  /* ── article card ── */
  .j-card {
    background: rgba(26,22,18,0.95);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    transition: background 0.3s;
    text-decoration: none;
  }
  .j-card:hover {
    background: rgba(30,26,22,1);
  }

  /* image */
  .j-card-img-wrap {
    overflow: hidden;
    position: relative;
    flex-shrink: 0;
  }
  .j-card-featured .j-card-img-wrap { height: 260px; }
  .j-card-standard .j-card-img-wrap { height: 190px; }

  .j-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94);
    will-change: transform;
    filter: brightness(0.88) saturate(0.85);
  }
  .j-card:hover .j-card-img-wrap img {
    transform: scale(1.06);
    filter: brightness(0.95) saturate(1);
  }

  /* gradient over image */
  .j-card-img-wrap::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, transparent 30%, rgba(26,22,18,0.55) 100%);
    z-index: 1;
  }

  /* category chip — floats on image */
  .j-card-cat {
    position: absolute;
    bottom: 12px;
    left: 14px;
    z-index: 2;
    font-family: 'Jost', sans-serif;
    font-size: 0.56rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold-light);
    background: rgba(26,22,18,0.75);
    border: 0.5px solid rgba(201,168,76,0.35);
    padding: 3px 9px;
    backdrop-filter: blur(4px);
  }

  /* body */
  .j-card-body {
    padding: 1.2rem 1.25rem 1.3rem;
    display: flex;
    flex-direction: column;
    flex: 1;
    border-top: 0.5px solid rgba(201,168,76,0.1);
  }
  .j-card-meta {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: rgba(201,168,76,0.55);
    text-transform: uppercase;
    margin: 0 0 0.55rem;
  }
  .j-card-title {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    color: var(--cream);
    margin: 0 0 0.6rem;
    line-height: 1.2;
    letter-spacing: 0.01em;
    transition: color 0.25s;
  }
  .j-card-featured .j-card-title { font-size: 1.5rem; }
  .j-card-standard .j-card-title { font-size: 1.1rem; }
  .j-card:hover .j-card-title { color: var(--gold-light); }

  .j-card-excerpt {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    color: rgba(253,248,241,0.5);
    line-height: 1.7;
    margin: 0 0 1rem;
    flex: 1;
  }
  /* hide excerpt on small standard cards */
  .j-card-standard .j-card-excerpt { display: none; }
  .j-card-featured .j-card-excerpt { display: block; }

  .j-card-cta {
    font-family: 'Jost', sans-serif;
    font-size: 0.63rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(201,168,76,0.6);
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: color 0.25s, gap 0.25s;
    margin-top: auto;
  }
  .j-card:hover .j-card-cta {
    color: var(--gold);
    gap: 11px;
  }

  /* gold left border on featured card */
  .j-card-featured::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    z-index: 3;
  }

  /* stagger entrance */
  .j-card { animation: j-fadeUp 0.65s ease both; }
  .j-card:nth-child(1) { animation-delay: 0.15s; }
  .j-card:nth-child(2) { animation-delay: 0.25s; }
  .j-card:nth-child(3) { animation-delay: 0.35s; }
  .j-card:nth-child(4) { animation-delay: 0.45s; }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .j-grid {
      grid-template-columns: 1.3fr repeat(3, 1fr);
    }
    .j-card-featured .j-card-img-wrap { height: 220px; }
    .j-card-standard .j-card-img-wrap { height: 160px; }
  }

  @media (max-width: 800px) {
    .j-section { padding: 4rem 1.4rem 4.5rem; }
    .j-grid {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto auto;
    }
    .j-card-featured {
      grid-column: 1 / -1;
    }
    .j-card-featured .j-card-img-wrap { height: 240px; }
    .j-card-featured .j-card-excerpt { display: block; }
    .j-card-standard .j-card-img-wrap { height: 170px; }
  }

  @media (max-width: 520px) {
    .j-section { padding: 3.5rem 1.1rem 4rem; }
    .j-grid {
      grid-template-columns: 1fr;
    }
    .j-card-featured { grid-column: 1; }
    .j-card-featured .j-card-img-wrap { height: 220px; }
    .j-card-standard .j-card-img-wrap { height: 190px; }
    .j-card-standard .j-card-excerpt { display: block; }
    .j-card-body { padding: 1rem 1.1rem 1.1rem; }
    .j-header { flex-direction: column; align-items: flex-start; gap: 0.8rem; }
  }
`;

/* ─── Component ──────────────────────────────────────────── */
export default function Journal() {
  return (
    <>
      <style>{J_STYLES}</style>

      <section className="j-section" aria-labelledby="j-heading">
        <div className="j-bg" aria-hidden="true" />
        <div className="j-grain" aria-hidden="true" />

        <div className="j-inner">
          {/* header row */}
          <header className="j-header">
            <div className="j-header-left">
              <p className="j-eyebrow">Stories &amp; Inspiration</p>
              <h2 className="j-heading" id="j-heading">
                The <em>Journal</em>
              </h2>
            </div>
            <Link to="/journal" className="j-header-link">
              All Articles <ArrowRight size={12} />
            </Link>
          </header>

          {/* cards */}
          <div className="j-grid" role="list">
            {posts.map((p, i) => (
              <Link
                key={p.slug}
                to={`/journal/${p.slug}`}
                className={`j-card ${i === 0 ? "j-card-featured" : "j-card-standard"}`}
                role="listitem"
                aria-label={`Read article: ${p.title}`}
              >
                {/* image */}
                <div className="j-card-img-wrap">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    width={i === 0 ? 700 : 400}
                    height={i === 0 ? 260 : 190}
                  />
                  <span className="j-card-cat">{p.category}</span>
                </div>

                {/* body */}
                <div className="j-card-body">
                  <p className="j-card-meta">
                    By Lumière &nbsp;·&nbsp; {p.date}
                  </p>
                  <h3 className="j-card-title">{p.title}</h3>
                  <p className="j-card-excerpt">{p.excerpt}</p>
                  <span className="j-card-cta">
                    Read Article <ArrowRight size={11} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
