import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

/* ─── Decorative SVG: dandelion / botanical ─── */
const BotanicalSVG = () => (
  <svg
    width="180"
    height="180"
    viewBox="0 0 180 180"
    fill="none"
    aria-hidden="true"
    style={{ display: "block" }}
  >
    <circle cx="90" cy="90" r="2.5" fill="#C9A84C" opacity="0.9" />
    {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 90 90)`}>
        <line
          x1="90"
          y1="87"
          x2="90"
          y2="32"
          stroke="#C9A84C"
          strokeWidth="0.7"
          opacity="0.55"
        />
        <circle cx="90" cy="29" r="3.2" fill="#C9A84C" opacity="0.7" />
        <line
          x1="90"
          y1="62"
          x2="80"
          y2="48"
          stroke="#C9A84C"
          strokeWidth="0.45"
          opacity="0.4"
        />
        <circle cx="79" cy="46" r="1.8" fill="#C9A84C" opacity="0.4" />
      </g>
    ))}
  </svg>
);

const StarSVG = ({ size = 14, opacity = 1 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    style={{ display: "inline-block" }}
  >
    <path
      d="M8 0L9.1 6.9L16 8L9.1 9.1L8 16L6.9 9.1L0 8L6.9 6.9L8 0Z"
      fill="#C9A84C"
      opacity={opacity}
    />
  </svg>
);

/* ─── Thin ornamental divider ─── */
const Ornament = () => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: "10px",
      margin: "1.5rem 0 1.6rem",
    }}
  >
    <div
      style={{
        flex: 1,
        height: "0.5px",
        background:
          "linear-gradient(to right, transparent, rgba(201,168,76,0.5))",
      }}
    />
    <StarSVG size={10} opacity={0.7} />
    <div
      style={{
        width: "24px",
        height: "0.5px",
        background: "rgba(201,168,76,0.5)",
      }}
    />
    <StarSVG size={10} opacity={0.7} />
    <div
      style={{
        flex: 1,
        height: "0.5px",
        background:
          "linear-gradient(to left, transparent, rgba(201,168,76,0.5))",
      }}
    />
  </div>
);

/* ─── Keyframes injected once ─── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink:        #1a1612;
    --ink-soft:   #4a3f35;
    --gold:       #C9A84C;
    --gold-light: #e8d49a;
    --gold-dim:   rgba(201,168,76,0.18);
    --cream:      #f9f5ee;
    --canvas:     #fdf8f1;
    --border-gold: rgba(201,168,76,0.3);
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.94); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes rotateSlow {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }
  @keyframes pulseDot {
    0%, 100% { opacity: 0.6; transform: scale(1); }
    50%       { opacity: 1;   transform: scale(1.4); }
  }

  .hero-section {
    background: var(--canvas);
    min-height: 92vh;
    display: flex;
    align-items: center;
    padding: 4rem 5vw;
    position: relative;
    overflow: hidden;
    max-width: 1280px;
    margin: 0 auto;
    box-sizing: border-box;
  }

  .hero-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: center;
    width: 100%;
    position: relative;
    z-index: 2;
  }

  /* ── text column ── */
  .hero-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 1.1rem;
    animation: fadeUp 0.7s ease both;
    animation-delay: 0.15s;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .hero-h1 {
    font-family: 'Cormorant Garamond', Georgia, serif;
    font-size: clamp(3rem, 5.5vw, 5rem);
    font-weight: 300;
    line-height: 1.05;
    color: var(--ink);
    margin: 0 0 0.1rem;
    letter-spacing: -0.015em;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.25s;
  }

  .hero-h1 em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg, #8B6914 0%, #C9A84C 40%, #e8d49a 60%, #C9A84C 80%, #8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 4s linear 1s infinite;
  }

  .hero-desc {
    font-family: 'Jost', sans-serif;
    font-size: 0.93rem;
    font-weight: 300;
    color: var(--ink-soft);
    line-height: 1.85;
    max-width: 340px;
    margin: 0;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.45s;
  }

  .hero-actions {
    display: flex;
    align-items: center;
    gap: 1.4rem;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.55s;
    flex-wrap: wrap;
  }

  .btn-primary-hero {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--canvas);
    background: var(--ink);
    border: 1px solid var(--ink);
    padding: 0.85rem 2.2rem;
    text-decoration: none;
    transition: background 0.3s, color 0.3s, border-color 0.3s, letter-spacing 0.3s;
    display: inline-block;
  }
  .btn-primary-hero:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    letter-spacing: 0.25em;
  }

  .btn-secondary-hero {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-soft);
    background: transparent;
    border: none;
    padding: 0;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    transition: color 0.25s, gap 0.25s;
    cursor: pointer;
  }
  .btn-secondary-hero:hover {
    color: var(--gold);
    gap: 11px;
  }
  .btn-secondary-hero::after {
    content: '→';
    display: inline-block;
    font-size: 0.85rem;
  }

  .hero-trust {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    animation: fadeUp 0.8s ease both;
    animation-delay: 0.65s;
    margin-top: 0.2rem;
  }
  .hero-trust-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    color: var(--ink-soft);
    letter-spacing: 0.04em;
  }
  .trust-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--gold);
  }

  /* ── image column ── */
  .hero-image-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    animation: scaleIn 1s ease both;
    animation-delay: 0.1s;
  }

  .ring-outer {
    position: absolute;
    border-radius: 50%;
    border: 0.5px solid rgba(201,168,76,0.35);
    animation: rotateSlow 35s linear infinite;
  }

  .ring-inner {
    position: absolute;
    border-radius: 50%;
    border: 0.5px dashed rgba(201,168,76,0.2);
    animation: rotateSlow 20s linear infinite reverse;
  }

  .hero-img-circle {
    width: clamp(280px, 38vw, 440px);
    height: clamp(280px, 38vw, 440px);
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    z-index: 2;
    box-shadow: 0 30px 80px rgba(26,22,18,0.18), 0 0 0 1px rgba(201,168,76,0.25);
    transition: box-shadow 0.4s;
  }
  .hero-img-circle:hover {
    box-shadow: 0 40px 100px rgba(26,22,18,0.25), 0 0 0 1.5px rgba(201,168,76,0.5);
  }
  .hero-img-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.7s ease;
  }
  .hero-img-circle:hover img {
    transform: scale(1.04);
  }

  /* gold arc badge */
  .hero-badge {
    position: absolute;
    bottom: 8%;
    right: 3%;
    z-index: 4;
    width: 88px;
    height: 88px;
    border-radius: 50%;
    background: var(--ink);
    border: 1px solid var(--border-gold);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1px;
    animation: fadeIn 1s ease both 0.9s;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  }
  .hero-badge span:first-child {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem;
    font-weight: 400;
    color: var(--gold);
    line-height: 1;
  }
  .hero-badge span:last-child {
    font-family: 'Jost', sans-serif;
    font-size: 0.52rem;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #a89060;
  }

  /* floating accent pills */
  .hero-pill {
    position: absolute;
    left: 3%;
    top: 20%;
    z-index: 4;
    background: rgba(253,248,241,0.95);
    border: 0.5px solid var(--border-gold);
    padding: 0.55rem 0.9rem;
    display: flex;
    align-items: center;
    gap: 8px;
    animation: fadeIn 1s ease both 1.1s;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
  }
  .pill-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--gold);
    animation: pulseDot 2s ease-in-out infinite;
  }
  .hero-pill span {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  /* ── background texture ── */
  .hero-bg-grain {
    position: absolute;
    inset: 0;
    background-image:
      radial-gradient(ellipse 60% 50% at 70% 50%, rgba(201,168,76,0.04) 0%, transparent 70%),
      radial-gradient(ellipse 40% 60% at 15% 80%, rgba(201,168,76,0.03) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── botanical position ── */
  .botanical-wrap {
    position: absolute;
    top: -10px;
    right: 60px;
    z-index: 1;
    pointer-events: none;
    opacity: 0.45;
    animation: fadeIn 1.5s ease both 0.5s;
  }

  /* ── small sparks ── */
  .spark {
    position: absolute;
    pointer-events: none;
    z-index: 2;
    animation: fadeIn 1s ease both;
  }

  /* ─── MOBILE ─── */
  @media (max-width: 800px) {
    .hero-section {
      padding: 5rem 1.4rem 3.5rem;
      min-height: auto;
    }
    .hero-grid {
      grid-template-columns: 1fr;
      gap: 2.8rem;
      text-align: center;
    }
    .hero-text-col {
      order: 2;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .hero-label {
      justify-content: center;
    }
    .hero-desc {
      margin-left: auto;
      margin-right: auto;
      max-width: 100%;
    }
    .hero-actions {
      justify-content: center;
    }
    .hero-trust {
      justify-content: center;
      flex-wrap: wrap;
    }
    .hero-image-col {
      order: 1;
    }
    .hero-img-circle {
      width: clamp(240px, 72vw, 320px);
      height: clamp(240px, 72vw, 320px);
    }
    .hero-badge {
      width: 72px;
      height: 72px;
      bottom: 4%;
      right: 6%;
    }
    .hero-badge span:first-child { font-size: 1.2rem; }
    .hero-badge span:last-child  { font-size: 0.48rem; }
    .hero-pill {
      left: 4%;
      top: 12%;
    }
    .botanical-wrap {
      display: none;
    }
    .spark { display: none; }
    .ornament-wrap { justify-content: center; }
  }

  @media (max-width: 480px) {
    .hero-h1 { font-size: clamp(2.4rem, 10vw, 3.2rem); }
    .hero-section { padding: 4.5rem 1.1rem 3rem; }
    .hero-trust { gap: 0.9rem; }
    .btn-primary-hero { padding: 0.78rem 1.8rem; font-size: 0.68rem; }
  }
`;

export default function Hero() {
  const imgWrapRef = useRef(null);

  /* subtle parallax on the image circle */
  useEffect(() => {
    const el = imgWrapRef.current;
    if (!el || window.innerWidth < 800) return;
    const handleMove = (e) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const dx = (clientX / innerWidth - 0.5) * 12;
      const dy = (clientY / innerHeight - 0.5) * 8;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const reset = () => {
      el.style.transform = "translate(0,0)";
    };
    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseleave", reset);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <>
      {/* Inject styles once */}
      <style>{STYLES}</style>

      <section
        className="hero-section"
        aria-label="Hero — Fine Jewelry Collection"
      >
        {/* ambient glow */}
        <div className="hero-bg-grain" aria-hidden="true" />

        {/* botanical top-right */}
        <div className="botanical-wrap" aria-hidden="true">
          <BotanicalSVG />
        </div>

        {/* spark accents */}
        <div
          className="spark"
          style={{ top: "36%", right: "46%", animationDelay: "0.8s" }}
        >
          <StarSVG size={14} opacity={0.7} />
        </div>
        <div
          className="spark"
          style={{ top: "20%", right: "39%", animationDelay: "1.2s" }}
        >
          <StarSVG size={9} opacity={0.45} />
        </div>
        <div
          className="spark"
          style={{ top: "14%", left: "42%", animationDelay: "1.5s" }}
        >
          <StarSVG size={7} opacity={0.35} />
        </div>

        <div className="hero-grid">
          {/* ── LEFT: text ── */}
          <div
            className="hero-text-col"
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* eyebrow */}
            <p className="hero-label">
              <StarSVG size={10} />
              Fine Jewelry Collection
              <StarSVG size={10} />
            </p>

            {/* headline */}
            <h1 className="hero-h1">
              Classic &amp; Elegant
              <br />
              <em>Silver Jewelry</em>
            </h1>

            {/* ornament divider */}
            <div
              className="ornament-wrap"
              style={{
                animation: "fadeUp 0.8s ease both",
                animationDelay: "0.35s",
              }}
            >
              <Ornament />
            </div>

            {/* description */}
            <p className="hero-desc">
              Handcrafted with intention. Each piece in our collection is made
              to be worn, felt, and cherished — unique designs that move with
              you.
            </p>

            {/* trust badges row */}
            <div
              className="hero-trust"
              style={{ marginTop: "1rem", marginBottom: "0.2rem" }}
            >
              <span className="hero-trust-item">
                <span className="trust-dot" />
                Handmade
              </span>
              <span className="hero-trust-item">
                <span className="trust-dot" />
                Sterling Silver
              </span>
              <span className="hero-trust-item">
                <span className="trust-dot" />
                Free Shipping
              </span>
            </div>

            {/* CTA row */}
            <div className="hero-actions" style={{ marginTop: "1.8rem" }}>
              <Link to="/shop" className="btn-primary-hero">
                Shop Now
              </Link>
              <Link to="/collections" className="btn-secondary-hero">
                View Collections
              </Link>
            </div>
          </div>

          {/* ── RIGHT: image ── */}
          <div
            className="hero-image-col"
            style={{
              display: "flex",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              ref={imgWrapRef}
              style={{
                position: "relative",
                transition: "transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94)",
              }}
            >
              {/* rotating rings */}
              <div
                className="ring-outer"
                style={{
                  width: "calc(clamp(280px,38vw,440px) + 52px)",
                  height: "calc(clamp(280px,38vw,440px) + 52px)",
                  top: "-26px",
                  left: "-26px",
                }}
                aria-hidden="true"
              />
              <div
                className="ring-inner"
                style={{
                  width: "calc(clamp(280px,38vw,440px) + 20px)",
                  height: "calc(clamp(280px,38vw,440px) + 20px)",
                  top: "-10px",
                  left: "-10px",
                }}
                aria-hidden="true"
              />

              {/* model photo */}
              <div className="hero-img-circle">
                <img
                  src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=640&auto=format&fit=crop&q=75&ixlib=rb-4.1.0"
                  alt="Model wearing handcrafted sterling silver jewelry"
                  width="440"
                  height="440"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                />
              </div>

              {/* badge — years/pieces */}
              <div className="hero-badge" aria-label="Over 200 designs">
                <span>200+</span>
                <span>Designs</span>
              </div>

              {/* live stock pill */}
              <div className="hero-pill" role="status" aria-live="polite">
                <span className="pill-dot" aria-hidden="true" />
                <span>New Arrivals</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
