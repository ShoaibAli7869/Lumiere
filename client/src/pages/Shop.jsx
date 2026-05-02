import { useState, useEffect, useCallback } from "react";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useProducts } from "@/hooks/useProducts";
import { productService } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

/* ─── Styles ─────────────────────────────────────────────── */
const SHOP_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink:         #1a1612;
    --ink-soft:    #5a4f45;
    --gold:        #C9A84C;
    --gold-light:  #e8d49a;
    --cream:       #fdf8f1;
    --canvas-alt:  #f3ede3;
    --border-gold: rgba(201,168,76,0.28);
    --f-bg:        #110f0c;
  }

  @keyframes sp-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes sp-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes sp-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes sp-skeletonPulse {
    0%, 100% { opacity: 0.5; }
    50%       { opacity: 1; }
  }
  @keyframes sp-lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes sp-drawerIn {
    from { transform: translateX(-100%); }
    to   { transform: translateX(0); }
  }

  /* ── page shell ── */
  .sp-page {
    background: var(--cream);
    min-height: 100vh;
  }

  /* ── hero banner ── */
  .sp-hero {
    background: var(--f-bg);
    position: relative;
    overflow: hidden;
    padding: 4rem 5vw 3.8rem;
    text-align: center;
  }
  .sp-hero-glow {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 65%);
    pointer-events: none;
  }
  .sp-hero-line-top {
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), rgba(201,168,76,0.3), transparent);
  }
  .sp-hero-inner {
    position: relative;
    z-index: 1;
    animation: sp-fadeUp 0.7s ease both 0.1s;
  }
  .sp-hero-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .sp-hero-eyebrow::before,
  .sp-hero-eyebrow::after {
    content: '';
    width: 28px; height: 0.5px;
    background: var(--border-gold);
    display: inline-block;
  }
  .sp-hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2.4rem, 5vw, 4rem);
    font-weight: 300;
    color: var(--cream);
    margin: 0 0 0.6rem;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .sp-hero-h1 em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: sp-shimmer 5s linear 1s infinite;
  }
  .sp-hero-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: rgba(253,248,241,0.5);
    margin: 0;
    letter-spacing: 0.04em;
  }

  /* breadcrumb */
  .sp-breadcrumb {
    position: absolute;
    bottom: 1rem; left: 5vw;
    display: flex;
    align-items: center;
    gap: 6px;
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.12em;
    color: rgba(253,248,241,0.3);
    text-transform: uppercase;
    z-index: 1;
  }
  .sp-breadcrumb a { color: inherit; text-decoration: none; }
  .sp-breadcrumb a:hover { color: var(--gold); }
  .sp-breadcrumb-sep { opacity: 0.4; }

  /* ── toolbar ── */
  .sp-toolbar {
    background: var(--cream);
    border-bottom: 0.5px solid var(--border-gold);
    padding: 0 5vw;
    position: sticky;
    top: 68px;
    z-index: 40;
    animation: sp-fadeIn 0.5s ease both 0.2s;
  }
  .sp-toolbar-inner {
    max-width: 1280px;
    margin: 0 auto;
    height: 56px;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: space-between;
  }

  /* search */
  .sp-search-wrap {
    position: relative;
    flex: 1;
    max-width: 340px;
  }
  .sp-search-icon {
    position: absolute;
    left: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--ink-soft);
    pointer-events: none;
    flex-shrink: 0;
  }
  .sp-search-input {
    width: 100%;
    padding: 0.55rem 2.4rem 0.55rem 2.4rem;
    border: 0.5px solid var(--border-gold);
    background: rgba(201,168,76,0.04);
    outline: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 300;
    color: var(--ink);
    letter-spacing: 0.03em;
    transition: border-color 0.25s, background 0.25s;
    box-sizing: border-box;
  }
  .sp-search-input::placeholder {
    color: rgba(90,79,69,0.45);
    letter-spacing: 0.08em;
    font-size: 0.73rem;
  }
  .sp-search-input:focus {
    border-color: rgba(201,168,76,0.6);
    background: rgba(201,168,76,0.06);
  }
  .sp-search-clear {
    position: absolute;
    right: 0.7rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ink-soft);
    display: flex;
    align-items: center;
    padding: 2px;
    transition: color 0.2s;
  }
  .sp-search-clear:hover { color: var(--ink); }

  /* right toolbar actions */
  .sp-toolbar-right {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    flex-shrink: 0;
  }
  .sp-result-count {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 400;
    color: var(--ink-soft);
    letter-spacing: 0.06em;
    white-space: nowrap;
  }

  /* sort select */
  .sp-sort-select {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: var(--ink);
    background: transparent;
    border: 0.5px solid var(--border-gold);
    padding: 0.42rem 0.8rem;
    cursor: pointer;
    outline: none;
    transition: border-color 0.25s;
    appearance: none;
    -webkit-appearance: none;
    padding-right: 1.6rem;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%23C9A84C' stroke-width='1.2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.55rem center;
  }
  .sp-sort-select:focus { border-color: var(--gold); }

  /* mobile filter btn */
  .sp-filter-btn {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink);
    background: none;
    border: 0.5px solid var(--border-gold);
    padding: 0.42rem 0.85rem;
    cursor: pointer;
    display: none;
    align-items: center;
    gap: 6px;
    transition: background 0.22s, color 0.22s;
  }
  .sp-filter-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
  }

  /* ── main layout ── */
  .sp-main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2.5rem 5vw 5rem;
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 2.5rem;
    align-items: start;
  }

  /* ── sidebar ── */
  .sp-sidebar {
    position: sticky;
    top: calc(68px + 56px + 1.5rem);
    animation: sp-fadeUp 0.65s ease both 0.25s;
  }
  .sp-sidebar-heading {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 1rem;
    padding-bottom: 0.7rem;
    border-bottom: 0.5px solid var(--border-gold);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .sp-sidebar-heading::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: var(--border-gold);
    max-width: 20px;
  }

  /* ── product area ── */
  .sp-products {
    animation: sp-fadeUp 0.65s ease both 0.3s;
  }
  .sp-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 1rem;
  }

  /* ── empty state ── */
  .sp-empty {
    text-align: center;
    padding: 5rem 0 4rem;
    animation: sp-fadeUp 0.6s ease both;
  }
  .sp-empty-icon {
    width: 56px; height: 56px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.4rem;
    color: var(--gold);
  }
  .sp-empty-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.7rem;
    font-weight: 300;
    font-style: italic;
    color: var(--ink);
    margin: 0 0 0.5rem;
  }
  .sp-empty-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    color: var(--ink-soft);
    margin: 0 0 1.8rem;
    letter-spacing: 0.03em;
  }
  .sp-empty-btn {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cream);
    background: var(--ink);
    border: 0.5px solid var(--ink);
    padding: 0.72rem 1.8rem;
    cursor: pointer;
    transition: background 0.3s, color 0.3s, border-color 0.3s;
  }
  .sp-empty-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
  }

  /* ── pagination ── */
  .sp-pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    margin-top: 3.5rem;
    flex-wrap: wrap;
  }
  .sp-page-btn {
    width: 36px; height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0.5px solid var(--border-gold);
    background: transparent;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 400;
    color: var(--ink-soft);
    transition: background 0.25s, color 0.25s, border-color 0.25s;
    letter-spacing: 0.05em;
  }
  .sp-page-btn:hover:not(:disabled) {
    border-color: var(--gold);
    color: var(--ink);
  }
  .sp-page-btn.active {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--cream);
    font-weight: 500;
  }
  .sp-page-btn.nav-btn {
    border-color: transparent;
    color: var(--ink-soft);
  }
  .sp-page-btn.nav-btn:hover:not(:disabled) {
    border-color: var(--border-gold);
    color: var(--ink);
  }
  .sp-page-btn:disabled {
    opacity: 0.25;
    cursor: default;
  }
  .sp-page-dots {
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    color: var(--ink-soft);
    padding: 0 0.2rem;
    letter-spacing: 0.1em;
  }

  /* ── mobile drawer overlay ── */
  .sp-drawer-overlay {
    position: fixed;
    inset: 0;
    background: rgba(18,14,10,0.6);
    z-index: 200;
    backdrop-filter: blur(3px);
    animation: sp-fadeIn 0.25s ease both;
  }
  .sp-drawer {
    position: fixed;
    top: 0; left: 0; bottom: 0;
    width: min(320px, 90vw);
    background: var(--cream);
    z-index: 201;
    overflow-y: auto;
    padding: 1.5rem 1.4rem 3rem;
    border-right: 0.5px solid var(--border-gold);
    animation: sp-drawerIn 0.3s cubic-bezier(0.25,0.46,0.45,0.94) both;
  }
  .sp-drawer-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    padding-bottom: 0.9rem;
    border-bottom: 0.5px solid var(--border-gold);
  }
  .sp-drawer-title {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0;
  }
  .sp-drawer-close {
    width: 32px; height: 32px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    background: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--ink-soft);
    transition: background 0.2s, color 0.2s;
  }
  .sp-drawer-close:hover { background: var(--gold); color: var(--ink); }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .sp-main {
      grid-template-columns: 1fr;
      padding: 2rem 1.4rem 4rem;
    }
    .sp-sidebar { display: none; }
    .sp-filter-btn { display: inline-flex; }
    .sp-toolbar { top: 60px; }
  }
  @media (max-width: 640px) {
    .sp-toolbar-inner { height: 52px; gap: 0.6rem; }
    .sp-search-wrap { max-width: none; flex: 1; }
    .sp-result-count { display: none; }
    .sp-sort-select { display: none; }
    .sp-hero { padding: 3rem 1.4rem 2.8rem; }
    .sp-main { padding: 1.5rem 1.1rem 3.5rem; }
    .sp-grid { grid-template-columns: repeat(2, 1fr); gap: 0.65rem; }
  }
  @media (max-width: 380px) {
    .sp-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── Pagination helper ── */
function getPaginationRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, 4, "…", total];
  if (current >= total - 2)
    return [1, "…", total - 3, total - 2, total - 1, total];
  return [1, "…", current - 1, current, current + 1, "…", total];
}

/* ─── Component ──────────────────────────────────────────── */
export default function Shop() {
  const [filters, setFilters] = useState({
    page: 1,
    sort: "createdAt",
    order: "desc",
  });
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const { products, pages, loading } = useProducts({
    ...filters,
    search: search || undefined,
  });

  useEffect(() => {
    productService
      .getCategories()
      .then(({ data }) => setCategories(data.categories || []));
  }, []);

  /* close drawer on resize to desktop */
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth > 900) setDrawerOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleClear = useCallback(() => {
    setFilters({ page: 1, sort: "createdAt", order: "desc" });
    setSearch("");
  }, []);

  const handleSort = (e) => {
    const [sort, order] = e.target.value.split(":");
    setFilters((f) => ({ ...f, sort, order, page: 1 }));
  };

  const sortValue = `${filters.sort}:${filters.order}`;
  const paginationRange = getPaginationRange(filters.page, pages);

  const FiltersContent = (
    <>
      <p className="sp-sidebar-heading">Refine</p>
      <ProductFilters
        filters={filters}
        setFilters={setFilters}
        categories={categories}
      />
    </>
  );

  return (
    <>
      <Helmet>
        <title>Shop Fine Jewellery — Lumière</title>
        <meta
          name="description"
          content="Browse our full collection of handcrafted sterling silver and gold necklaces, earrings, bracelets and rings. Free shipping on orders over $75."
        />
        <meta property="og:title" content="Shop Fine Jewellery — Lumière" />
        <meta
          property="og:description"
          content="Handcrafted fine jewelry for every occasion."
        />
        <link rel="canonical" href="https://lumiere.com/shop" />
      </Helmet>

      <style>{SHOP_STYLES}</style>

      <div className="sp-page">
        {/* ── Hero banner ── */}
        <div className="sp-hero" role="banner">
          <div className="sp-hero-glow" aria-hidden="true" />
          <div className="sp-hero-line-top" aria-hidden="true" />
          <div className="sp-hero-inner">
            <p className="sp-hero-eyebrow">Lumière Jewellery</p>
            <h1 className="sp-hero-h1">
              Shop <em>Collection</em>
            </h1>
            <p className="sp-hero-sub">
              Handcrafted fine jewellery for every occasion
            </p>
          </div>
          <nav className="sp-breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="sp-breadcrumb-sep">›</span>
            <span style={{ color: "rgba(253,248,241,0.55)" }}>Shop</span>
          </nav>
        </div>

        {/* ── Sticky toolbar ── */}
        <div className="sp-toolbar" role="search">
          <div className="sp-toolbar-inner">
            {/* mobile filter btn */}
            <button
              className="sp-filter-btn"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open filters"
            >
              <SlidersHorizontal size={13} />
              Filters
            </button>

            {/* search */}
            <div className="sp-search-wrap">
              <Search size={13} className="sp-search-icon" aria-hidden="true" />
              <input
                type="search"
                className="sp-search-input"
                placeholder="Search jewellery…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search products"
              />
              {search && (
                <button
                  className="sp-search-clear"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={12} />
                </button>
              )}
            </div>

            <div className="sp-toolbar-right">
              {/* result count */}
              {!loading && (
                <p className="sp-result-count" aria-live="polite">
                  {products.length} piece{products.length !== 1 ? "s" : ""}
                </p>
              )}

              {/* sort */}
              <select
                className="sp-sort-select"
                value={sortValue}
                onChange={handleSort}
                aria-label="Sort products"
              >
                <option value="createdAt:desc">Newest</option>
                <option value="createdAt:asc">Oldest</option>
                <option value="price:asc">Price: Low → High</option>
                <option value="price:desc">Price: High → Low</option>
                <option value="name:asc">Name: A → Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Main layout ── */}
        <div className="sp-main">
          {/* Desktop sidebar */}
          <aside className="sp-sidebar" aria-label="Product filters">
            {FiltersContent}
          </aside>

          {/* Products area */}
          <main className="sp-products" aria-label="Products">
            {loading ? (
              <div
                className="sp-grid"
                aria-busy="true"
                aria-label="Loading products"
              >
                {Array.from({ length: 9 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="sp-empty" role="status">
                <div className="sp-empty-icon" aria-hidden="true">
                  <Search size={22} />
                </div>
                <p className="sp-empty-heading">Nothing found</p>
                <p className="sp-empty-sub">
                  Try adjusting your filters or search term.
                </p>
                <button className="sp-empty-btn" onClick={handleClear}>
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="sp-grid">
                  {products.map((p) => (
                    <ProductCard key={p._id} product={p} />
                  ))}
                </div>

                {/* Pagination */}
                {pages > 1 && (
                  <nav className="sp-pagination" aria-label="Page navigation">
                    <button
                      className="sp-page-btn nav-btn"
                      onClick={() =>
                        setFilters((f) => ({ ...f, page: f.page - 1 }))
                      }
                      disabled={filters.page === 1}
                      aria-label="Previous page"
                    >
                      <ChevronLeft size={15} />
                    </button>

                    {paginationRange.map((item, i) =>
                      item === "…" ? (
                        <span key={`dots-${i}`} className="sp-page-dots">
                          ···
                        </span>
                      ) : (
                        <button
                          key={item}
                          className={`sp-page-btn${filters.page === item ? " active" : ""}`}
                          onClick={() =>
                            setFilters((f) => ({ ...f, page: item }))
                          }
                          aria-label={`Page ${item}`}
                          aria-current={
                            filters.page === item ? "page" : undefined
                          }
                        >
                          {item}
                        </button>
                      ),
                    )}

                    <button
                      className="sp-page-btn nav-btn"
                      onClick={() =>
                        setFilters((f) => ({ ...f, page: f.page + 1 }))
                      }
                      disabled={filters.page === pages}
                      aria-label="Next page"
                    >
                      <ChevronRight size={15} />
                    </button>
                  </nav>
                )}
              </>
            )}
          </main>
        </div>

        {/* ── Mobile filter drawer ── */}
        {drawerOpen && (
          <>
            <div
              className="sp-drawer-overlay"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <div
              className="sp-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Product filters"
            >
              <div className="sp-drawer-header">
                <p className="sp-drawer-title">Refine</p>
                <button
                  className="sp-drawer-close"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close filters"
                >
                  <X size={14} />
                </button>
              </div>
              <ProductFilters
                filters={filters}
                setFilters={(f) => {
                  setFilters(f);
                  setDrawerOpen(false);
                }}
                categories={categories}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
