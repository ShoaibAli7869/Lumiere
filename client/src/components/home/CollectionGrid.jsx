import { useState } from "react";
import { Link } from "react-router-dom";

/* ─── Data ───────────────────────────────────────────────── */
const tabs = [
  { label: "All", filter: "all" },
  { label: "Bracelets", filter: "bracelet" },
  { label: "Necklaces", filter: "necklace" },
  { label: "Earrings", filter: "earring" },
  { label: "Rings", filter: "ring" },
];

const images = [
  {
    src: "https://images.unsplash.com/photo-1716512064598-4536d086736c?w=800&auto=format&fit=crop&q=70",
    alt: "Layered gold bracelet stack on wrist",
    label: "Bracelets",
    num: "01",
    filter: "bracelet",
    to: "/collections/bracelets",
    layout: "large",
  },
  {
    src: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=600&auto=format&fit=crop&q=70",
    alt: "Delicate gold necklace pendant",
    label: "Necklaces",
    num: "02",
    filter: "necklace",
    to: "/collections/necklaces",
    layout: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1620656798579-1984d9e87df7?w=500&auto=format&fit=crop&q=70",
    alt: "Sculptural drop earrings in sterling silver",
    label: "Earrings",
    num: "03",
    filter: "earring",
    to: "/collections/earrings",
    layout: "small",
  },
  {
    src: "https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=500&auto=format&fit=crop&q=70",
    alt: "Stackable bezel ring in gold vermeil",
    label: "Rings",
    num: "04",
    filter: "ring",
    to: "/collections/rings",
    layout: "small",
  },
];

const stats = [
  { num: "240", suffix: "+", label: "Unique Pieces" },
  { num: "18", suffix: "k", label: "Gold Standard" },
  { num: "4", suffix: "", label: "Collections" },
  { num: "∞", suffix: "", label: "Stories Told" },
];

/* ─── Styles ─────────────────────────────────────────────── */
const CG_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@200;300;400;500&display=swap');

  :root {
    --cg-bg:           #f7f2ea;
    --cg-surface:      #fdf9f3;
    --cg-gold:         #9a7b3c;
    --cg-gold-light:   #c9a84c;
    --cg-gold-pale:    rgba(154,123,60,0.10);
    --cg-gold-border:  rgba(154,123,60,0.22);
    --cg-ink:          #1c1712;
    --cg-ink-mid:      #4a3f32;
    --cg-ink-soft:     #8a7b6a;
    --cg-ink-faint:    #c5bdb2;
    --cg-warm-white:   #fffdf8;
  }

  /* ── animations ── */
  @keyframes cg-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── section ── */
  .cg-section {
    background: var(--cg-bg);
    padding: 4.5rem 3rem 5rem;
    position: relative;
    overflow: hidden;
    font-family: 'Jost', sans-serif;
  }

  /* linen noise texture */
  .cg-section::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.055'/%3E%3C/svg%3E");
    pointer-events: none;
    opacity: 0.6;
    z-index: 0;
  }

  /* ── decorative circle accent ── */
  .cg-circle-accent {
    position: absolute;
    top: -180px;
    right: -120px;
    width: 520px;
    height: 520px;
    border-radius: 50%;
    border: 1px solid var(--cg-gold-border);
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
  }
  .cg-circle-accent::after {
    content: '';
    position: absolute;
    inset: 40px;
    border-radius: 50%;
    border: 1px solid var(--cg-gold-border);
    opacity: 0.6;
  }

  .cg-inner {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }

  /* ── header ── */
  .cg-header {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 2.8rem;
    gap: 2rem;
    animation: cg-fadeUp 0.7s ease both;
  }

  .cg-eyebrow {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 0.75rem;
  }
  .cg-eyebrow-line {
    width: 28px;
    height: 1px;
    background: var(--cg-gold);
    opacity: 0.7;
  }
  .cg-eyebrow-text {
    font-size: 0.58rem;
    font-weight: 500;
    letter-spacing: 0.38em;
    text-transform: uppercase;
    color: var(--cg-gold);
  }

  .cg-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.6rem, 4.5vw, 4.2rem);
    font-weight: 300;
    color: var(--cg-ink);
    line-height: 0.95;
    letter-spacing: -0.01em;
    margin: 0;
  }
  .cg-title em {
    font-style: italic;
    font-weight: 400;
    color: var(--cg-gold);
  }

  .cg-sub {
    font-size: 0.72rem;
    font-weight: 300;
    color: var(--cg-ink-soft);
    letter-spacing: 0.08em;
    margin-top: 0.9rem;
  }

  .cg-browse-link {
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--cg-ink-mid);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--cg-ink-faint);
    transition: color 0.2s, border-color 0.2s;
    align-self: flex-end;
    white-space: nowrap;
  }
  .cg-browse-link:hover { color: var(--cg-gold); border-color: var(--cg-gold); }
  .cg-browse-link svg { transition: transform 0.25s; }
  .cg-browse-link:hover svg { transform: translateX(4px); }

  /* ── tabs ── */
  .cg-tabs {
    display: flex;
    margin-bottom: 2rem;
    overflow-x: auto;
    scrollbar-width: none;
    border-bottom: 1px solid var(--cg-ink-faint);
    animation: cg-fadeUp 0.7s ease both 0.1s;
  }
  .cg-tabs::-webkit-scrollbar { display: none; }

  .cg-tab {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 500;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cg-ink-soft);
    background: none;
    border: none;
    padding: 0.55rem 1.25rem 0.5rem;
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
    white-space: nowrap;
  }
  .cg-tab::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0; right: 0;
    height: 1.5px;
    background: var(--cg-gold);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.4,0,0.2,1);
  }
  .cg-tab.active { color: var(--cg-ink); }
  .cg-tab.active::after { transform: scaleX(1); }
  .cg-tab:hover:not(.active) { color: var(--cg-ink-mid); }

  /* ── bento grid ── */
  .cg-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    grid-template-rows: 320px 210px;
    gap: 0.65rem;
    animation: cg-fadeUp 0.7s ease both 0.2s;
  }

  .cg-slot-large  { grid-column: 1; grid-row: 1 / 3; }
  .cg-slot-tall   { grid-column: 2; grid-row: 1; }
  .cg-slot-smrow  {
    grid-column: 2;
    grid-row: 2;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.65rem;
  }

  /* ── tile ── */
  .cg-tile {
    position: relative;
    overflow: hidden;
    display: block;
    cursor: pointer;
    background: var(--cg-surface);
    text-decoration: none;
    transition: opacity 0.45s, filter 0.45s, box-shadow 0.3s;
    box-shadow: 0 1px 3px rgba(28,23,18,0.06), 0 4px 12px rgba(28,23,18,0.04);
  }
  .cg-tile:hover {
    box-shadow: 0 4px 24px rgba(28,23,18,0.12), 0 2px 8px rgba(154,123,60,0.1);
  }
  .cg-tile.hidden {
    opacity: 0.18;
    filter: grayscale(0.6) brightness(1.1);
    pointer-events: none;
  }
  .cg-tile.visible { opacity: 1; filter: none; }

  .cg-tile img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    background: var(--cg-surface);
    display: block;
    transition: transform 0.85s cubic-bezier(0.25,0.46,0.45,0.94), filter 0.4s;
    filter: brightness(0.88) saturate(0.9) contrast(1.05);
  }
  .cg-tile:hover img {
    transform: scale(1.06);
    filter: brightness(0.75) saturate(0.8) contrast(1.05);
  }

  /* warm gradient vignette */
  .cg-tile::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(150deg, rgba(253,249,243,0) 20%, rgba(28,23,18,0.55) 100%);
    z-index: 2;
    pointer-events: none;
    transition: opacity 0.4s;
  }
  .cg-tile:hover::after { opacity: 0.9; }

  /* stamp number */
  .cg-tile-num {
    position: absolute;
    top: -8px;
    right: 12px;
    font-family: 'Cormorant Garamond', serif;
    font-size: 7.5rem;
    font-weight: 600;
    color: rgba(154,123,60,0.08);
    line-height: 1;
    z-index: 3;
    pointer-events: none;
    transition: color 0.4s, transform 0.4s;
    user-select: none;
    letter-spacing: -0.04em;
  }
  .cg-tile:hover .cg-tile-num {
    color: rgba(154,123,60,0.14);
    transform: scale(1.04) translateY(-3px);
  }
  .cg-slot-smrow .cg-tile-num { font-size: 4.8rem; }

  /* inset border on large tile only */
  .cg-tile-inner-border {
    position: absolute;
    inset: 14px;
    border: 1px solid rgba(154,123,60,0.15);
    z-index: 5;
    pointer-events: none;
    transition: border-color 0.3s;
  }
  .cg-tile:hover .cg-tile-inner-border { border-color: rgba(154,123,60,0.30); }

  /* label bar */
  .cg-tile-info {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 4;
    padding: 0.9rem 1rem 0.85rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .cg-tile-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.1rem;
    font-weight: 400;
    font-style: italic;
    color: rgba(253,249,243,0.95);
    letter-spacing: 0.01em;
    line-height: 1;
    transform: translateY(4px);
    transition: transform 0.3s;
    text-shadow: 0 1px 8px rgba(28,23,18,0.3);
    margin: 0;
  }
  .cg-tile:hover .cg-tile-name { transform: translateY(0); }
  .cg-slot-large .cg-tile-name { font-size: 1.5rem; }
  .cg-slot-smrow .cg-tile-name { font-size: 0.95rem; }

  /* arrow badge */
  .cg-tile-arrow {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: rgba(253,249,243,0.12);
    border: 1px solid rgba(201,168,76,0.55);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    opacity: 0;
    transform: scale(0.65) rotate(-30deg);
    transition: opacity 0.3s, transform 0.38s cubic-bezier(0.34,1.56,0.64,1);
  }
  .cg-tile:hover .cg-tile-arrow { opacity: 1; transform: scale(1) rotate(0deg); }
  .cg-slot-smrow .cg-tile-arrow { width: 24px; height: 24px; }

  /* ── stats row ── */
  .cg-stats {
    display: flex;
    gap: 2rem;
    margin-top: 2.2rem;
    padding-top: 1.8rem;
    border-top: 1px solid var(--cg-gold-border);
    animation: cg-fadeUp 0.7s ease both 0.35s;
  }
  .cg-stat {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }
  .cg-stat-num {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    color: var(--cg-ink);
    line-height: 1;
    letter-spacing: -0.02em;
  }
  .cg-stat-num span {
    color: var(--cg-gold);
    font-style: italic;
  }
  .cg-stat-label {
    font-size: 0.55rem;
    font-weight: 500;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--cg-ink-soft);
  }
  .cg-stat-divider {
    width: 1px;
    background: var(--cg-ink-faint);
    margin: 0.1rem 0;
    opacity: 0.6;
    align-self: stretch;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .cg-section { padding: 3.5rem 1.8rem 4rem; }
    .cg-grid { grid-template-rows: 280px 195px; }
  }

  @media (max-width: 680px) {
    .cg-section { padding: 3rem 1.2rem 3.5rem; }
    .cg-header { flex-direction: column; align-items: flex-start; gap: 1.2rem; }
    .cg-grid {
      grid-template-columns: 1fr;
      grid-template-rows: 270px 210px auto;
    }
    .cg-slot-large { grid-column: 1; grid-row: 1; }
    .cg-slot-tall  { grid-column: 1; grid-row: 2; }
    .cg-slot-smrow { grid-column: 1; grid-row: 3; min-height: 160px; }
    .cg-slot-smrow .cg-tile { height: 160px; }
    .cg-stats { flex-wrap: wrap; gap: 1.2rem; }
    .cg-stat-divider { display: none; }
  }

  @media (max-width: 380px) {
    .cg-slot-smrow { grid-template-columns: 1fr; }
    .cg-slot-smrow .cg-tile { height: 175px; }
  }
`;

/* ─── Arrow icon ─────────────────────────────────────────── */
function ArrowIcon({ size = 13 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#c9a84c"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

/* ─── Tile subcomponent ───────────────────────────────────── */
function Tile({
  image,
  active,
  slotClass,
  arrowSize = 13,
  showInnerBorder = false,
}) {
  const isVisible = active === "all" || image.filter === active;

  return (
    <div className={slotClass}>
      <Link
        to={image.to}
        className={`cg-tile ${isVisible ? "visible" : "hidden"}`}
        aria-label={`Shop ${image.label}`}
        tabIndex={isVisible ? 0 : -1}
      >
        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" />
        {showInnerBorder && <div className="cg-tile-inner-border" />}
        <span className="cg-tile-num" aria-hidden="true">
          {image.num}
        </span>
        <div className="cg-tile-info">
          <p className="cg-tile-name">{image.label}</p>
          <div className="cg-tile-arrow" aria-hidden="true">
            <ArrowIcon size={arrowSize} />
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function CollectionGrid() {
  const [active, setActive] = useState("all");

  return (
    <>
      <style>{CG_STYLES}</style>

      <section className="cg-section" aria-labelledby="cg-heading">
        {/* Decorative circle accent */}
        <div className="cg-circle-accent" aria-hidden="true" />

        <div className="cg-inner mb-10">
          {/* ── Header ── */}
          <header className="cg-header">
            <div>
              <div className="cg-eyebrow">
                <div className="cg-eyebrow-line" />
                <span className="cg-eyebrow-text">Signature Styles</span>
              </div>
              <h2 className="cg-title" id="cg-heading">
                Exquisite <em>Collection</em>
              </h2>
              <p className="cg-sub">
                Each piece is crafted to tell a story — yours.
              </p>
            </div>
            <Link
              to="/collections"
              className="cg-browse-link"
              aria-label="Browse all collections"
            >
              Browse All
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </header>

          {/* ── Tabs ── */}
          <nav className="cg-tabs" aria-label="Filter collections">
            {tabs.map((t) => (
              <button
                key={t.filter}
                className={`cg-tab${active === t.filter ? " active" : ""}`}
                onClick={() => setActive(t.filter)}
                aria-pressed={active === t.filter}
              >
                {t.label}
              </button>
            ))}
          </nav>

          {/* ── Bento grid ── */}
          <div className="cg-grid" role="list">
            {/* Large — Bracelets */}
            <Tile
              image={images[0]}
              active={active}
              slotClass="cg-slot-large"
              arrowSize={14}
              showInnerBorder
            />

            {/* Tall — Necklaces */}
            <Tile
              image={images[1]}
              active={active}
              slotClass="cg-slot-tall"
              arrowSize={13}
            />

            {/* Small row — Earrings + Rings */}
            <div
              className="cg-slot-smrow"
              role="group"
              aria-label="Small collection tiles"
            >
              <Tile
                image={images[2]}
                active={active}
                slotClass=""
                arrowSize={11}
              />
              <Tile
                image={images[3]}
                active={active}
                slotClass=""
                arrowSize={11}
              />
            </div>
          </div>

          {/* ── Stats row ── */}
          <div className="cg-stats" aria-label="Collection statistics">
            {stats.map((s, i) => (
              <>
                <div className="cg-stat" key={s.label}>
                  <span className="cg-stat-num">
                    {s.num}
                    {s.suffix && <span>{s.suffix}</span>}
                  </span>
                  <span className="cg-stat-label">{s.label}</span>
                </div>
                {i < stats.length - 1 && (
                  <div
                    className="cg-stat-divider"
                    key={`div-${i}`}
                    aria-hidden="true"
                  />
                )}
              </>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
