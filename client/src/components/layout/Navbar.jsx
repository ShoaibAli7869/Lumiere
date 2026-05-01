import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  LogOut,
  UserCircle,
  LayoutDashboard,
  ArrowRight,
} from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import CartDrawer from "@/components/cart/CartDrawer";

const NAV_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink:         #1a1612;
    --ink-soft:    #5a4f45;
    --gold:        #C9A84C;
    --gold-light:  #e8d49a;
    --cream:       #fdf8f1;
    --border-gold: rgba(201,168,76,0.28);
  }

  @keyframes nav-fadeDown {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes nav-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes mobile-slideDown {
    from { opacity: 0; max-height: 0; }
    to   { opacity: 1; max-height: 400px; }
  }

  /* ── header shell ── */
  .nav-header {
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background 0.35s, box-shadow 0.35s, border-color 0.35s;
  }
  .nav-header.scrolled {
    background: rgba(253,248,241,0.96);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    box-shadow: 0 1px 0 var(--border-gold), 0 4px 24px rgba(26,22,18,0.06);
  }
  .nav-header.top {
    background: var(--cream);
    box-shadow: none;
    border-bottom: 0.5px solid var(--border-gold);
  }

  /* gold top line */
  .nav-top-line {
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), rgba(201,168,76,0.3), transparent);
  }

  /* ── inner bar ── */
  .nav-bar {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0 5vw;
    height: 68px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  /* ── logo ── */
  .nav-logo {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.65rem;
    font-weight: 300;
    letter-spacing: 0.1em;
    color: var(--ink);
    text-decoration: none;
    line-height: 1;
    flex-shrink: 0;
  }
  .nav-logo em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: nav-shimmer 5s linear 1s infinite;
  }

  /* ── desktop nav links ── */
  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-link {
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-soft);
    text-decoration: none;
    padding: 0.5rem 0.9rem;
    position: relative;
    transition: color 0.22s;
  }
  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0.9rem; right: 0.9rem;
    height: 1px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .nav-link:hover,
  .nav-link.active {
    color: var(--ink);
  }
  .nav-link.active::after,
  .nav-link:hover::after {
    transform: scaleX(1);
  }

  /* ── icon group ── */
  .nav-icons {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }
  .nav-icon-btn {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ink-soft);
    border-radius: 50%;
    transition: background 0.22s, color 0.22s;
    position: relative;
    text-decoration: none;
  }
  .nav-icon-btn:hover {
    background: rgba(201,168,76,0.1);
    color: var(--ink);
  }

  /* cart badge */
  .nav-cart-badge {
    position: absolute;
    top: 2px; right: 2px;
    width: 14px; height: 14px;
    border-radius: 50%;
    background: var(--gold);
    color: var(--ink);
    font-family: 'Jost', sans-serif;
    font-size: 8px;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1;
  }

  /* mobile toggle — only visible on small screens */
  .nav-mobile-toggle {
    display: none;
  }

  /* ── user dropdown ── */
  .nav-user-wrap { position: relative; }
  .nav-dropdown {
    position: absolute;
    top: calc(100% + 10px);
    right: 0;
    width: 220px;
    background: var(--cream);
    border: 0.5px solid var(--border-gold);
    box-shadow: 0 12px 40px rgba(26,22,18,0.12);
    z-index: 200;
    animation: nav-fadeDown 0.2s ease both;
    overflow: hidden;
  }
  .nav-dropdown-header {
    padding: 12px 16px 10px;
    border-bottom: 0.5px solid var(--border-gold);
    background: rgba(201,168,76,0.05);
  }
  .nav-dropdown-signed-in {
    font-family: 'Jost', sans-serif;
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 3px;
  }
  .nav-dropdown-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .nav-dropdown-body { padding: 6px 0; }
  .nav-dropdown-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 16px;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--ink-soft);
    text-decoration: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, padding-left 0.2s;
  }
  .nav-dropdown-item:hover {
    background: rgba(201,168,76,0.07);
    color: var(--ink);
    padding-left: 20px;
  }
  .nav-dropdown-item.danger {
    color: #b84040;
    border-top: 0.5px solid var(--border-gold);
    margin-top: 4px;
  }
  .nav-dropdown-item.danger:hover {
    background: rgba(184,64,64,0.06);
    color: #922;
  }

  /* ── mobile menu ── */
  .nav-mobile-menu {
    background: var(--cream);
    border-top: 0.5px solid var(--border-gold);
    overflow: hidden;
    animation: mobile-slideDown 0.3s ease both;
  }
  .nav-mobile-inner {
    max-width: 1280px;
    margin: 0 auto;
    padding: 0.5rem 5vw 1.5rem;
  }
  .nav-mobile-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 0;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-soft);
    text-decoration: none;
    border-bottom: 0.5px solid rgba(201,168,76,0.1);
    transition: color 0.22s, padding-left 0.22s;
  }
  .nav-mobile-link:last-child { border-bottom: none; }
  .nav-mobile-link:hover {
    color: var(--ink);
    padding-left: 6px;
  }
  .nav-mobile-link.active { color: var(--gold); }

  /* ── hide/show helpers ── */
  @media (min-width: 769px) {
    .nav-desktop-only { display: flex !important; }
    .nav-mobile-toggle { display: none !important; }
  }
  @media (max-width: 768px) {
    .nav-desktop-only { display: none !important; }
    .nav-mobile-toggle { display: flex !important; }
    .nav-bar { height: 60px; padding: 0 1.4rem; }
    .nav-logo { font-size: 1.45rem; }
  }
`;

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const userMenuRef = useRef(null);
  const { items } = useCartStore();
  const { isLoggedIn, user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target))
        setUserMenuOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  /* close mobile menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Collections", to: "/collections" },
    { label: "Journal", to: "/journal" },
  ];

  const isActive = (to) =>
    to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

  return (
    <>
      <style>{NAV_STYLES}</style>

      <header className={`nav-header ${scrolled ? "scrolled" : "top"}`}>
        <div className="nav-top-line" aria-hidden="true" />

        <div className="nav-bar">
          {/* Logo */}
          <Link to="/" className="nav-logo" aria-label="Lumière – Home">
            <em>Lumière</em>
          </Link>

          {/* Desktop nav */}
          <nav className="nav-desktop-only" aria-label="Main navigation">
            <ul className="nav-links">
              {navLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className={`nav-link${isActive(l.to) ? " active" : ""}`}
                    aria-current={isActive(l.to) ? "page" : undefined}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Icons */}
          <div className="nav-icons">
            {/* Search */}
            <button className="nav-icon-btn" aria-label="Search">
              <Search size={17} />
            </button>

            {/* User */}
            <div className="nav-user-wrap" ref={userMenuRef}>
              <button
                className="nav-icon-btn"
                aria-label={isLoggedIn ? "Account menu" : "Sign in"}
                aria-expanded={userMenuOpen}
                onClick={() => {
                  if (isLoggedIn) setUserMenuOpen((o) => !o);
                  else navigate("/login");
                }}
              >
                <User size={17} />
              </button>

              {isLoggedIn && userMenuOpen && (
                <div className="nav-dropdown" role="menu">
                  <div className="nav-dropdown-header">
                    <p className="nav-dropdown-signed-in">Signed in as</p>
                    <p className="nav-dropdown-name">
                      {user?.name || user?.email}
                    </p>
                  </div>
                  <div className="nav-dropdown-body">
                    {user?.role === "admin" && (
                      <Link
                        to="/admin"
                        className="nav-dropdown-item"
                        role="menuitem"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard size={14} /> Admin Panel
                      </Link>
                    )}
                    <Link
                      to="/account"
                      className="nav-dropdown-item"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <UserCircle size={14} /> My Account
                    </Link>
                    <button
                      className="nav-dropdown-item danger"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              className="nav-icon-btn"
              aria-label={`Cart${cartCount > 0 ? `, ${cartCount} items` : ""}`}
              onClick={() => setCartOpen(true)}
            >
              <ShoppingBag size={17} />
              {cartCount > 0 && (
                <span className="nav-cart-badge" aria-hidden="true">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              className="nav-icon-btn nav-mobile-toggle"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <nav className="nav-mobile-menu" aria-label="Mobile navigation">
            <div className="nav-mobile-inner">
              {navLinks.map((l) => (
                <Link
                  key={l.label}
                  to={l.to}
                  className={`nav-mobile-link${isActive(l.to) ? " active" : ""}`}
                  aria-current={isActive(l.to) ? "page" : undefined}
                >
                  {l.label}
                  <ArrowRight size={13} style={{ opacity: 0.4 }} />
                </Link>
              ))}
            </div>
          </nav>
        )}

        <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      </header>
    </>
  );
}
