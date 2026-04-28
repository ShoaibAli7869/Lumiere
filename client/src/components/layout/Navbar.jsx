import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, User, ShoppingBag, Menu, X } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import CartDrawer from "@/components/cart/CartDrawer";
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { items } = useCartStore();
  const { isLoggedIn } = useAuthStore();
  const location = useLocation();

  const cartCount = items.reduce((s, i) => s + i.qty, 0);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const navLinks = [
    { label: "Home", to: "/" },
    { label: "Shop", to: "/shop" },
    { label: "Blog", to: "/blog" },
  ];

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: scrolled ? "rgba(250,247,242,0.95)" : "var(--color-canvas)",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        boxShadow: scrolled ? "var(--shadow-nav)" : "none",
        transition: "all 0.3s ease",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
          height: "72px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            fontWeight: 400,
            color: "var(--color-ink)",
            textDecoration: "none",
            letterSpacing: "0.02em",
          }}
        >
          Lumiere
        </Link>

        {/* Nav links — desktop */}
        <nav
          style={{ display: "flex", gap: "2rem" }}
          className="hidden md:flex"
        >
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "0.9rem",
                fontWeight: 500,
                color:
                  location.pathname === l.to
                    ? "var(--color-cta-dark)"
                    : "var(--color-ink)",
                textDecoration: "none",
                borderBottom:
                  location.pathname === l.to
                    ? "2px solid var(--color-cta-dark)"
                    : "2px solid transparent",
                paddingBottom: "2px",
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.color = "var(--color-cta-dark)")
              }
              onMouseLeave={(e) =>
                (e.target.style.color =
                  location.pathname === l.to
                    ? "var(--color-cta-dark)"
                    : "var(--color-ink)")
              }
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <button
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink)",
              padding: "4px",
            }}
          >
            <Search size={20} />
          </button>
          <Link
            to={isLoggedIn ? "/account" : "/login"}
            style={{ color: "var(--color-ink)" }}
          >
            <User size={20} />
          </Link>
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: "relative",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink)",
              display: "flex",
              padding: "4px",
            }}
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "var(--color-cta-dark)",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {cartCount}
              </span>
            )}
          </button>
          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink)",
            }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            background: "var(--color-canvas)",
            borderTop: "1px solid rgba(0,0,0,0.08)",
            padding: "1rem 2rem 1.5rem",
          }}
        >
          {navLinks.map((l) => (
            <Link
              key={l.label}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              style={{
                display: "block",
                padding: "0.75rem 0",
                fontFamily: "var(--font-sans)",
                fontSize: "1rem",
                color: "var(--color-ink)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
}
