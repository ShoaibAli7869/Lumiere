import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote:
      "Montluc claim to offer the finest diamond jewellery you can buy direct from the maker. I did my research, compared specifications with some of the big brands and now I will never walk into a store again.",
    name: "Alexandra Jerselius",
    title: "Verified Buyer",
    avatar: "https://i.pravatar.cc/80?img=47",
    stars: 5,
  },
  {
    quote:
      "Absolutely stunning pieces. The craftsmanship is impeccable and the customer service was beyond my expectations. I'll be a customer for life.",
    name: "Sophia Marchetti",
    title: "Loyal Customer",
    avatar: "https://i.pravatar.cc/80?img=32",
    stars: 5,
  },
  {
    quote:
      "I gifted my wife a necklace for our anniversary. She hasn't taken it off since. The packaging alone felt like a luxury experience.",
    name: "James Whitmore",
    title: "Gift Buyer",
    avatar: "https://i.pravatar.cc/80?img=12",
    stars: 5,
  },
];

const T_STYLES = `
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

  @keyframes t-fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes t-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes t-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes t-quoteSlideIn {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── section ── */
  .t-section {
    background: var(--canvas-alt);
    padding: 5.5rem 5vw;
    position: relative;
    overflow: hidden;
  }
  .t-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 60% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%);
    pointer-events: none;
  }

  /* large decorative quote mark */
  .t-deco-quote {
    position: absolute;
    top: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-family: 'Cormorant Garamond', serif;
    font-size: 14rem;
    line-height: 1;
    color: rgba(201,168,76,0.07);
    pointer-events: none;
    user-select: none;
    z-index: 0;
    letter-spacing: -0.05em;
  }

  .t-inner {
    max-width: 720px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  /* ── header ── */
  .t-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.7rem;
    display: flex;
    align-items: center;
    gap: 12px;
    animation: t-fadeUp 0.6s ease both 0.1s;
  }
  .t-eyebrow::before, .t-eyebrow::after {
    content: '';
    width: 28px;
    height: 0.5px;
    background: var(--border-gold);
    display: inline-block;
  }

  .t-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 2.9rem);
    font-weight: 300;
    color: var(--ink);
    text-align: center;
    margin: 0 0 3rem;
    line-height: 1.05;
    animation: t-fadeUp 0.7s ease both 0.2s;
  }
  .t-heading em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: t-shimmer 5s linear 1s infinite;
  }

  /* ── card ── */
  .t-card {
    background: var(--cream);
    border: 0.5px solid var(--border-gold);
    padding: 3rem 3.2rem 2.5rem;
    text-align: center;
    position: relative;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 8px 40px rgba(26,22,18,0.06);
  }
  /* corner accents */
  .t-card::before, .t-card::after {
    content: '';
    position: absolute;
    width: 18px;
    height: 18px;
    border-color: rgba(201,168,76,0.45);
    border-style: solid;
  }
  .t-card::before {
    top: 10px; left: 10px;
    border-width: 1px 0 0 1px;
  }
  .t-card::after {
    bottom: 10px; right: 10px;
    border-width: 0 1px 1px 0;
  }

  /* stars */
  .t-stars {
    display: flex;
    justify-content: center;
    gap: 4px;
    margin-bottom: 1.4rem;
    animation: t-fadeIn 0.5s ease both;
  }
  .t-star {
    width: 12px;
    height: 12px;
    fill: var(--gold);
    color: var(--gold);
  }

  /* quote text */
  .t-quote {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.05rem, 2vw, 1.22rem);
    font-weight: 300;
    font-style: italic;
    color: var(--ink);
    line-height: 1.75;
    margin: 0 0 2.2rem;
    animation: t-quoteSlideIn 0.45s ease both;
  }

  /* divider */
  .t-card-divider {
    width: 32px;
    height: 0.5px;
    background: var(--gold);
    margin: 0 auto 1.6rem;
    opacity: 0.6;
  }

  /* avatar + name */
  .t-author {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    animation: t-fadeIn 0.5s ease both 0.1s;
  }
  .t-avatar-ring {
    width: 52px;
    height: 52px;
    border-radius: 50%;
    padding: 2px;
    background: linear-gradient(135deg, var(--gold), var(--gold-light), var(--gold));
    margin-bottom: 0.2rem;
  }
  .t-avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 2px solid var(--cream);
  }
  .t-name {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
    margin: 0;
  }
  .t-role {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    color: var(--gold);
    text-transform: uppercase;
    margin: 0;
  }

  /* ── nav ── */
  .t-nav {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.4rem;
    margin-top: 2rem;
    animation: t-fadeUp 0.6s ease both 0.4s;
  }
  .t-nav-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--ink-soft);
    transition: background 0.25s, border-color 0.25s, color 0.25s, transform 0.2s;
  }
  .t-nav-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    transform: scale(1.08);
  }

  /* dot indicators */
  .t-dots {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .t-dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background: var(--border-gold);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background 0.25s, transform 0.25s, width 0.3s;
  }
  .t-dot.active {
    background: var(--gold);
    width: 18px;
    border-radius: 3px;
    transform: none;
  }

  /* count */
  .t-count {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: var(--ink-soft);
    opacity: 0.6;
    min-width: 36px;
    text-align: center;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 640px) {
    .t-section { padding: 4rem 1.4rem; }
    .t-card { padding: 2.2rem 1.5rem 2rem; }
    .t-heading { margin-bottom: 2.2rem; }
    .t-deco-quote { font-size: 9rem; }
  }
  @media (max-width: 400px) {
    .t-card { padding: 1.8rem 1.1rem 1.7rem; }
    .t-quote { font-size: 1rem; }
  }
`;

/* ── Star icon ── */
const StarIcon = () => (
  <svg
    viewBox="0 0 16 16"
    className="t-star"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M8 0l1.8 5.5H16l-4.9 3.6 1.9 5.9L8 11.4l-5 3.6 1.9-5.9L0 5.5h6.2z" />
  </svg>
);

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const total = testimonials.length;

  const go = (next) => {
    setIdx((next + total) % total);
    setAnimKey((k) => k + 1);
  };

  /* auto-advance */
  useEffect(() => {
    const timer = setTimeout(() => go(idx + 1), 6000);
    return () => clearTimeout(timer);
  }, [idx]);

  const t = testimonials[idx];

  return (
    <>
      <style>{T_STYLES}</style>

      <section className="t-section" aria-labelledby="t-heading">
        <div className="t-bg" aria-hidden="true" />
        <div className="t-deco-quote" aria-hidden="true">
          "
        </div>

        <div className="t-inner">
          {/* header */}
          <p className="t-eyebrow">What Clients Say</p>
          <h2 className="t-heading" id="t-heading">
            Happy <em>Clients</em>
          </h2>

          {/* card */}
          <div
            className="t-card"
            role="region"
            aria-live="polite"
            aria-label="Testimonial"
          >
            {/* stars */}
            <div className="t-stars" aria-label={`${t.stars} out of 5 stars`}>
              {Array.from({ length: t.stars }).map((_, i) => (
                <StarIcon key={i} />
              ))}
            </div>

            {/* quote — re-keyed to retrigger animation */}
            <blockquote key={`q-${animKey}`} className="t-quote">
              "{t.quote}"
            </blockquote>

            <div className="t-card-divider" aria-hidden="true" />

            {/* author */}
            <div key={`a-${animKey}`} className="t-author">
              <div className="t-avatar-ring">
                <img
                  src={t.avatar}
                  alt={`Portrait of ${t.name}`}
                  className="t-avatar"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <p className="t-name">{t.name}</p>
              <p className="t-role">{t.title}</p>
            </div>
          </div>

          {/* navigation */}
          <nav className="t-nav" aria-label="Testimonial navigation">
            <button
              className="t-nav-btn"
              onClick={() => go(idx - 1)}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={16} />
            </button>

            <div
              className="t-dots"
              role="tablist"
              aria-label="Testimonial indicators"
            >
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  className={`t-dot${i === idx ? " active" : ""}`}
                  onClick={() => go(i)}
                  role="tab"
                  aria-selected={i === idx}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              className="t-nav-btn"
              onClick={() => go(idx + 1)}
              aria-label="Next testimonial"
            >
              <ChevronRight size={16} />
            </button>
          </nav>

          <p className="t-count" aria-hidden="true">
            {String(idx + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </p>
        </div>
      </section>
    </>
  );
}
