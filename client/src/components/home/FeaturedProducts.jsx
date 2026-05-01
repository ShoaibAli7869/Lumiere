import { useState, useRef, useEffect } from "react";
import { Heart, ShoppingBag, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

/* ─── Static product data ─────────────────────────────── */
const products = [
  {
    id: 1,
    name: "Stackable Bezel Ring",
    price: "$49.00",
    badge: "Sale 10%",
    tag: "Rings",
    img: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 2,
    name: "Golden Medallion Necklace",
    price: "$89.00",
    oldPrice: "$110.00",
    tag: "Necklaces",
    img: "https://plus.unsplash.com/premium_photo-1674255466849-b23fc5f5d3eb?w=600&auto=format&fit=crop&q=70",
  },
  {
    id: 3,
    name: "Diamond Medallion Necklace",
    price: "$28.00",
    oldPrice: "$48.00",
    tag: "Necklaces",
    img: "https://plus.unsplash.com/premium_photo-1724762183134-c17cf5f5bed2?w=600&auto=format&fit=crop&q=70",
  },
];

/* ─── Shared design tokens (mirrors Hero) ─────────────── */
const FP_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  /* tokens */
  :root {
    --ink:        #1a1612;
    --ink-soft:   #5a4f45;
    --gold:       #C9A84C;
    --gold-light: #e8d49a;
    --gold-dim:   rgba(201,168,76,0.15);
    --cream:      #f9f5ee;
    --canvas:     #fdf8f1;
    --border-gold: rgba(201,168,76,0.3);
    --card-bg:    #fffcf7;
  }

  /* entrance */
  @keyframes fp-fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fp-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes fp-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes fp-lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  /* section wrapper */
  .fp-section {
    background: var(--canvas);
    padding: 5rem 5vw 5.5rem;
    position: relative;
    overflow: hidden;
  }
  .fp-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 300px 1fr;
    gap: 4rem;
    align-items: start;
  }

  /* ── LEFT COLUMN: editorial photo slab ── */
  .fp-photo-col {
    position: sticky;
    top: 6rem;
  }
  .fp-photo-frame {
    position: relative;
    overflow: hidden;
  }
  .fp-photo-frame::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      transparent 55%,
      rgba(26,22,18,0.7) 100%
    );
    z-index: 2;
    pointer-events: none;
  }
  .fp-photo-frame img {
    width: 100%;
    height: 440px;
    object-fit: cover;
    display: block;
    transition: transform 0.9s cubic-bezier(0.25,0.46,0.45,0.94);
    will-change: transform;
  }
  .fp-photo-frame:hover img {
    transform: scale(1.04);
  }
  /* gold corner accents */
  .fp-photo-frame::after {
    content: '';
    position: absolute;
    top: 12px; left: 12px; right: 12px; bottom: 12px;
    border: 0.5px solid rgba(201,168,76,0.35);
    pointer-events: none;
    z-index: 3;
  }
  /* photo caption */
  .fp-photo-caption {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    z-index: 4;
    padding: 1.2rem 1.1rem 1.1rem;
  }
  .fp-photo-caption p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.25rem;
    font-weight: 300;
    font-style: italic;
    color: rgba(253,248,241,0.92);
    margin: 0;
    line-height: 1.3;
  }
  .fp-photo-caption span {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--gold-light);
    display: block;
    margin-bottom: 0.35rem;
  }

  /* gold accent line under photo */
  .fp-gold-line {
    height: 2px;
    background: linear-gradient(to right, var(--gold), transparent);
    transform-origin: left;
    animation: fp-lineGrow 0.9s ease both;
    animation-delay: 0.5s;
  }

  /* ── RIGHT COLUMN: heading + cards ── */
  .fp-right {
    display: flex;
    flex-direction: column;
  }

  .fp-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.7rem;
    display: flex;
    align-items: center;
    gap: 10px;
    animation: fp-fadeUp 0.6s ease both 0.1s;
  }
  .fp-eyebrow::before,
  .fp-eyebrow::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: var(--border-gold);
    max-width: 40px;
  }

  .fp-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 300;
    color: var(--ink);
    margin: 0 0 0.3rem;
    line-height: 1.1;
    letter-spacing: -0.01em;
    animation: fp-fadeUp 0.7s ease both 0.2s;
  }
  .fp-heading em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg, #8B6914 0%, #C9A84C 40%, #e8d49a 60%, #C9A84C 80%, #8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: fp-shimmer 4s linear 1s infinite;
  }

  .fp-subhead {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: var(--ink-soft);
    margin: 0 0 2.2rem;
    animation: fp-fadeUp 0.7s ease both 0.3s;
    letter-spacing: 0.02em;
  }

  /* ── product grid ── */
  .fp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.1rem;
  }

  /* ── product card ── */
  .fp-card {
    background: var(--card-bg);
    border: 0.5px solid rgba(201,168,76,0.18);
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: border-color 0.3s, box-shadow 0.3s;
    animation: fp-fadeUp 0.65s ease both;
  }
  .fp-card:hover {
    border-color: rgba(201,168,76,0.55);
    box-shadow: 0 12px 40px rgba(26,22,18,0.1);
  }

  /* image wrapper */
  .fp-card-img-wrap {
    position: relative;
    overflow: hidden;
    height: 200px;
  }
  .fp-card-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
    will-change: transform;
  }
  .fp-card:hover .fp-card-img-wrap img {
    transform: scale(1.07);
  }

  /* hover overlay with quick-action icons */
  .fp-card-overlay {
    position: absolute;
    inset: 0;
    background: rgba(26,22,18,0.32);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 3;
  }
  .fp-card:hover .fp-card-overlay {
    opacity: 1;
  }
  .fp-overlay-btn {
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background: rgba(253,248,241,0.95);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
    transform: translateY(8px);
  }
  .fp-card:hover .fp-overlay-btn {
    transform: translateY(0);
  }
  .fp-overlay-btn:nth-child(2) { transition-delay: 0.05s; }
  .fp-overlay-btn:hover {
    background: var(--gold);
  }
  .fp-overlay-btn:hover svg { color: var(--ink) !important; }

  /* badge */
  .fp-badge {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 4;
    font-family: 'Jost', sans-serif;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--canvas);
    background: var(--ink);
    padding: 3px 9px;
    border: 0.5px solid rgba(201,168,76,0.4);
  }

  /* tag chip */
  .fp-tag {
    position: absolute;
    bottom: 10px;
    left: 10px;
    z-index: 4;
    font-family: 'Jost', sans-serif;
    font-size: 0.55rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold-light);
    background: rgba(26,22,18,0.7);
    padding: 2px 7px;
    backdrop-filter: blur(4px);
  }

  /* card body */
  .fp-card-body {
    padding: 0.85rem 0.9rem 0.9rem;
    border-top: 0.5px solid rgba(201,168,76,0.15);
  }
  .fp-card-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.05rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0 0 0.35rem;
    line-height: 1.2;
    letter-spacing: 0.01em;
  }
  .fp-card-pricing {
    display: flex;
    align-items: baseline;
    gap: 7px;
    margin-bottom: 0.75rem;
  }
  .fp-card-price {
    font-family: 'Jost', sans-serif;
    font-size: 0.92rem;
    font-weight: 500;
    color: var(--ink);
    letter-spacing: 0.02em;
  }
  .fp-card-old {
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 300;
    color: var(--ink-soft);
    text-decoration: line-through;
    letter-spacing: 0.02em;
  }

  /* add to cart btn */
  .fp-add-btn {
    width: 100%;
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--canvas);
    background: var(--ink);
    border: 0.5px solid var(--ink);
    padding: 0.6rem 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 7px;
    transition: background 0.3s, border-color 0.3s, color 0.3s, letter-spacing 0.25s;
  }
  .fp-add-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    letter-spacing: 0.24em;
  }

  /* footer link */
  .fp-footer {
    margin-top: 1.8rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    animation: fp-fadeUp 0.7s ease both 0.7s;
  }
  .fp-view-link {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: gap 0.25s, color 0.25s;
  }
  .fp-view-link:hover {
    color: var(--gold);
    gap: 14px;
  }
  .fp-view-link::after { content: '→'; }
  .fp-footer-line {
    flex: 1;
    height: 0.5px;
    background: var(--border-gold);
    max-width: 120px;
  }

  /* ── background grain ── */
  .fp-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 60% at 80% 50%, rgba(201,168,76,0.04) 0%, transparent 65%);
    pointer-events: none;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .fp-inner {
      grid-template-columns: 240px 1fr;
      gap: 2.5rem;
    }
    .fp-photo-frame img { height: 380px; }
    .fp-grid { grid-template-columns: repeat(3, 1fr); gap: 0.9rem; }
    .fp-card-img-wrap { height: 170px; }
  }

  @media (max-width: 800px) {
    .fp-section { padding: 3.5rem 1.4rem 4rem; }
    .fp-inner {
      grid-template-columns: 1fr;
      gap: 2.5rem;
    }
    .fp-photo-col {
      position: static;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: end;
      gap: 1rem;
    }
    .fp-photo-frame img { height: 280px; }
    .fp-photo-meta {
      padding-bottom: 0.5rem;
    }
    .fp-photo-meta-heading {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.8rem;
      font-weight: 300;
      color: var(--ink);
      line-height: 1.1;
      margin: 0 0 0.5rem;
    }
    .fp-photo-meta-desc {
      font-family: 'Jost', sans-serif;
      font-size: 0.82rem;
      font-weight: 300;
      color: var(--ink-soft);
      line-height: 1.7;
      margin: 0;
    }
    .fp-gold-line { display: none; }
    .fp-heading { display: none; }
    .fp-eyebrow { display: none; }
    .fp-subhead { display: none; }
    .fp-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.9rem;
    }
    .fp-card-img-wrap { height: 160px; }
  }

  @media (max-width: 520px) {
    .fp-photo-col { grid-template-columns: 1fr; }
    .fp-photo-frame img { height: 240px; }
    .fp-grid { grid-template-columns: repeat(2, 1fr); gap: 0.75rem; }
    .fp-card-img-wrap { height: 140px; }
    .fp-card-name { font-size: 0.95rem; }
    .fp-card-body { padding: 0.7rem 0.75rem 0.75rem; }
    .fp-footer { margin-top: 1.2rem; }
  }

  @media (max-width: 360px) {
    .fp-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── Staggered card entrance with IntersectionObserver ── */
function useReveal(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cards = el.querySelectorAll(".fp-card");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cards.forEach((card, i) => {
              card.style.animationDelay = `${0.1 + i * 0.12}s`;
              card.style.animationPlayState = "running";
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 },
    );
    observer.observe(el);
    // pause until in view
    cards.forEach((c) => (c.style.animationPlayState = "paused"));
    return () => observer.disconnect();
  }, [ref]);
}

/* ─── Individual product card ──────────────────────────── */
function ProductCard({ p, addItem, isWishlisted, toggle, isLoggedIn }) {
  const productId = p._id || p.id;
  const wishlisted = isWishlisted(productId);
  const [wishLoading, setWishLoading] = useState(false);

  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoggedIn) return toast.error("Sign in to save items");
    setWishLoading(true);
    await toggle(productId);
    toast.success(wishlisted ? "Removed from wishlist" : "Added to wishlist");
    setWishLoading(false);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const priceNum = parseFloat(p.price.replace("$", ""));
    addItem({ ...p, _id: productId, price: priceNum });
    toast.success("Added to cart");
  };

  return (
    <article className="fp-card" aria-label={p.name}>
      <div className="fp-card-img-wrap">
        <img
          src={p.img}
          alt={p.name}
          loading="lazy"
          decoding="async"
          width="300"
          height="200"
        />

        {/* hover overlay */}
        <div className="fp-card-overlay" aria-hidden="true">
          <button
            className="fp-overlay-btn"
            onClick={handleWishlist}
            title={wishlisted ? "Remove from wishlist" : "Save to wishlist"}
            disabled={wishLoading}
          >
            <Heart
              size={14}
              fill={wishlisted ? "#C82014" : "none"}
              color={wishlisted ? "#C82014" : "#1a1612"}
            />
          </button>
          <button
            className="fp-overlay-btn"
            onClick={handleAdd}
            title="Add to cart"
          >
            <ShoppingBag size={14} color="#1a1612" />
          </button>
          <Link
            to={`/product/${productId}`}
            className="fp-overlay-btn"
            title="Quick view"
            style={{ textDecoration: "none" }}
          >
            <Eye size={14} color="#1a1612" />
          </Link>
        </div>

        {p.badge && <span className="fp-badge">{p.badge}</span>}
        {p.tag && <span className="fp-tag">{p.tag}</span>}
      </div>

      <div className="fp-card-body">
        <p className="fp-card-name">{p.name}</p>
        <div className="fp-card-pricing">
          <span className="fp-card-price">{p.price}</span>
          {p.oldPrice && <span className="fp-card-old">{p.oldPrice}</span>}
        </div>
        <button className="fp-add-btn" onClick={handleAdd}>
          <ShoppingBag size={12} />
          Add to Cart
        </button>
      </div>
    </article>
  );
}

/* ─── Section ───────────────────────────────────────────── */
export default function FeaturedProducts() {
  const addItem = useCartStore((s) => s.addItem);
  const { isWishlisted, toggle } = useWishlistStore();
  const { isLoggedIn } = useAuthStore();
  const gridRef = useRef(null);
  useReveal(gridRef);

  return (
    <>
      <style>{FP_STYLES}</style>

      <section className="fp-section" aria-labelledby="fp-heading">
        <div className="fp-bg" aria-hidden="true" />

        <div className="fp-inner">
          {/* ── LEFT: editorial photo ── */}
          <aside className="fp-photo-col">
            <div className="fp-photo-frame">
              <img
                src="https://images.unsplash.com/photo-1626122509259-ea8e0a136ada?w=600&auto=format&fit=crop&q=75"
                alt="Model wearing featured jewelry pieces"
                loading="lazy"
                decoding="async"
                width="300"
                height="440"
              />
              <div className="fp-photo-caption">
                <span>New Season</span>
                <p>Worn by those who notice the details.</p>
              </div>
            </div>
            <div className="fp-gold-line" />

            {/* mobile-only: text beside photo */}
            <div
              className="fp-photo-meta"
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <p className="fp-photo-meta-heading">
                Featured
                <br />
                <em>Products</em>
              </p>
              <p className="fp-photo-meta-desc">
                Handcrafted sterling pieces curated for the season.
              </p>
            </div>
          </aside>

          {/* ── RIGHT: heading + grid ── */}
          <div className="fp-right">
            <p className="fp-eyebrow">Find Your Favourite</p>
            <h2 className="fp-heading" id="fp-heading">
              Featured <em>Products</em>
            </h2>
            <p className="fp-subhead">
              Handcrafted sterling pieces curated for the season.
            </p>

            {/* cards */}
            <div className="fp-grid" ref={gridRef} role="list">
              {products.map((p) => (
                <div key={p._id || p.id} role="listitem">
                  <ProductCard
                    p={p}
                    addItem={addItem}
                    isWishlisted={isWishlisted}
                    toggle={toggle}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              ))}
            </div>

            {/* footer */}
            <div className="fp-footer">
              <Link to="/shop" className="fp-view-link">
                View All Pieces
              </Link>
              <div className="fp-footer-line" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
