import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const categories = [
  { label: "Necklaces", to: "/collections/necklaces", count: "24 pieces" },
  { label: "Earrings", to: "/collections/earrings", count: "18 pieces" },
  { label: "Bracelets", to: "/collections/bracelets", count: "15 pieces" },
];

const LB_STYLES = `
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

  @keyframes lb-fadeLeft {
    from { opacity: 0; transform: translateX(-18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes lb-fadeRight {
    from { opacity: 0; transform: translateX(18px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes lb-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes lb-lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  /* ── wrapper ── */
  .lb-section {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 420px;
    max-height: 480px;
    position: relative;
    overflow: hidden;
  }

  /* ── LEFT: photo ── */
  .lb-photo {
    position: relative;
    overflow: hidden;
    animation: lb-fadeLeft 0.8s ease both 0.1s;
  }
  .lb-photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);
    will-change: transform;
    filter: brightness(0.9) saturate(0.9);
  }
  .lb-photo:hover img {
    transform: scale(1.04);
    filter: brightness(0.95) saturate(1);
  }

  /* dark gradient at bottom */
  .lb-photo::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 40%,
      rgba(26,22,18,0.7) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  /* gold inset border */
  .lb-photo::before {
    content: '';
    position: absolute;
    inset: 14px;
    border: 0.5px solid rgba(201,168,76,0.3);
    z-index: 2;
    pointer-events: none;
    transition: border-color 0.3s;
  }
  .lb-photo:hover::before {
    border-color: rgba(201,168,76,0.55);
  }

  /* product tag */
  .lb-product-tag {
    position: absolute;
    bottom: 22px;
    left: 22px;
    z-index: 3;
    display: flex;
    flex-direction: column;
    gap: 1px;
  }
  .lb-product-tag-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 400;
    font-style: italic;
    color: rgba(253,248,241,0.95);
    display: block;
    line-height: 1.2;
  }
  .lb-product-tag-price {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--gold-light);
    letter-spacing: 0.06em;
    display: block;
  }
  /* gold dot accent */
  .lb-product-tag::before {
    content: '';
    display: block;
    width: 18px;
    height: 1px;
    background: var(--gold);
    margin-bottom: 5px;
    transform-origin: left;
    animation: lb-lineGrow 0.6s ease both 0.8s;
  }

  /* season badge */
  .lb-season-badge {
    position: absolute;
    top: 22px;
    right: 22px;
    z-index: 3;
    font-family: 'Jost', sans-serif;
    font-size: 0.57rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold-light);
    background: rgba(26,22,18,0.72);
    border: 0.5px solid rgba(201,168,76,0.35);
    padding: 4px 10px;
    backdrop-filter: blur(6px);
  }

  /* ── RIGHT: content ── */
  .lb-content {
    background: var(--cream);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 3rem 3rem 3rem 3.2rem;
    position: relative;
    animation: lb-fadeRight 0.8s ease both 0.15s;
    border-left: 0.5px solid var(--border-gold);
  }

  /* subtle background pattern */
  .lb-content::before {
    content: '';
    position: absolute;
    top: 0; right: 0;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%);
    pointer-events: none;
  }

  .lb-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.65rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lb-eyebrow::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: var(--border-gold);
    max-width: 36px;
  }

  .lb-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3vw, 2.8rem);
    font-weight: 300;
    color: var(--ink);
    margin: 0 0 0.2rem;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .lb-heading em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: lb-shimmer 5s linear 1s infinite;
  }

  .lb-divider {
    width: 36px;
    height: 1px;
    background: linear-gradient(to right, var(--gold), transparent);
    margin: 1.1rem 0 1.2rem;
    transform-origin: left;
    animation: lb-lineGrow 0.7s ease both 0.5s;
  }

  .lb-subtext {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    color: var(--ink-soft);
    line-height: 1.75;
    margin: 0 0 1.6rem;
    max-width: 280px;
  }

  /* category list */
  .lb-categories {
    list-style: none;
    margin: 0 0 1.8rem;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .lb-category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0;
    border-bottom: 0.5px solid rgba(201,168,76,0.12);
    cursor: pointer;
    transition: padding-left 0.25s;
  }
  .lb-category-item:first-child {
    border-top: 0.5px solid rgba(201,168,76,0.12);
  }
  .lb-category-item:hover {
    padding-left: 6px;
  }
  .lb-category-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    text-decoration: none;
  }
  .lb-category-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 400;
    color: var(--ink);
    letter-spacing: 0.02em;
    transition: color 0.25s;
  }
  .lb-category-item:hover .lb-category-name {
    color: var(--gold);
  }
  .lb-category-right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lb-category-count {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--ink-soft);
    opacity: 0.7;
  }
  .lb-category-arrow {
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.25s, transform 0.25s;
    color: var(--gold);
  }
  .lb-category-item:hover .lb-category-arrow {
    opacity: 1;
    transform: translateX(0);
  }

  /* CTA */
  .lb-cta {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    background: var(--ink);
    border: 0.5px solid var(--ink);
    padding: 0.78rem 1.9rem;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 9px;
    align-self: flex-start;
    transition: background 0.3s, color 0.3s, border-color 0.3s, letter-spacing 0.25s;
  }
  .lb-cta:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    letter-spacing: 0.27em;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .lb-section {
      max-height: none;
      min-height: auto;
    }
    .lb-content {
      padding: 2.4rem 2rem;
    }
    .lb-subtext { display: none; }
  }

  @media (max-width: 640px) {
    .lb-section {
      grid-template-columns: 1fr;
    }
    .lb-photo { height: 280px; }
    .lb-content {
      padding: 2.2rem 1.4rem 2.5rem;
      border-left: none;
      border-top: 0.5px solid var(--border-gold);
    }
    .lb-subtext { display: block; max-width: 100%; }
    .lb-heading { font-size: 2rem; }
  }

  @media (max-width: 400px) {
    .lb-photo { height: 240px; }
    .lb-content { padding: 1.8rem 1.1rem 2.2rem; }
  }
`;

export default function Lookbook() {
  return (
    <>
      <style>{LB_STYLES}</style>

      <section className="lb-section" aria-labelledby="lb-heading">
        {/* ── LEFT: photo ── */}
        <div className="lb-photo">
          <img
            src="https://images.unsplash.com/photo-1569397288884-4d43d6738fbd?w=700&auto=format&fit=crop&q=75"
            alt="Model wearing Delicate Silver Infinity Chain necklace"
            loading="lazy"
            decoding="async"
            width="700"
            height="480"
          />
          <span className="lb-season-badge">S/S 2024</span>
          <div className="lb-product-tag">
            <span className="lb-product-tag-name">
              Delicate Silver Infinity Chain
            </span>
            <span className="lb-product-tag-price">$295.00</span>
          </div>
        </div>

        {/* ── RIGHT: content ── */}
        <div className="lb-content">
          <p className="lb-eyebrow">New Season</p>
          <h2 className="lb-heading" id="lb-heading">
            The <em>Lookbook</em>
          </h2>
          <div className="lb-divider" aria-hidden="true" />
          <p className="lb-subtext">
            Curated edits for every mood. Shop by category and discover the
            pieces made to be worn, layered, and loved.
          </p>

          {/* category list */}
          <ul className="lb-categories" aria-label="Shop by category">
            {categories.map((c) => (
              <li key={c.label} className="lb-category-item">
                <Link
                  to={c.to}
                  className="lb-category-link"
                  aria-label={`Shop ${c.label}`}
                >
                  <span className="lb-category-name">{c.label}</span>
                  <span className="lb-category-right">
                    <span className="lb-category-count">{c.count}</span>
                    <ArrowRight
                      size={13}
                      className="lb-category-arrow"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/lookbook" className="lb-cta">
            Shop Collection <ArrowRight size={12} />
          </Link>
        </div>
      </section>
    </>
  );
}
