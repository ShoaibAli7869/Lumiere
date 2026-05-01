import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Tag,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";

const nav = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/products", icon: Package, label: "Products" },
  { to: "/admin/orders", icon: ShoppingBag, label: "Orders" },
  { to: "/admin/categories", icon: Tag, label: "Categories" },
];

export default function Admin() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "var(--color-canvas)",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 252,
          background: "var(--color-band-dark)",
          display: "flex",
          flexDirection: "column",
          position: "fixed",
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 50,
          transition: "transform 0.3s ease",
        }}
        className={
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }
      >
        <div
          style={{
            padding: "32px 24px 22px",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Link
            to="/"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 24,
              color: "var(--color-cta)",
              letterSpacing: "0.04em",
              textDecoration: "none",
              display: "block",
            }}
          >
            Lumiere
          </Link>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 10,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginTop: 3,
            }}
          >
            Admin Console
          </div>
        </div>

        <nav style={{ flex: 1, padding: "18px 12px" }}>
          {nav.map(({ to, icon: Icon, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setOpen(false)}
              style={({ isActive }) => ({
                display: "flex",
                alignItems: "center",
                gap: 11,
                padding: "10px 14px",
                borderRadius: 8,
                marginBottom: 2,
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: isActive ? 600 : 400,
                color: isActive ? "var(--color-cta)" : "rgba(255,255,255,0.5)",
                background: isActive ? "rgba(201,168,76,0.1)" : "transparent",
                borderLeft: `2px solid ${isActive ? "var(--color-cta)" : "transparent"}`,
                textDecoration: "none",
                transition: "all 0.18s",
              })}
            >
              <Icon size={16} /> {label}
            </NavLink>
          ))}
        </nav>

        <div
          style={{
            padding: "18px 22px 28px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 12,
            }}
          >
            {user?.name}
          </div>
          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: "rgba(255,255,255,0.35)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-cta)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(255,255,255,0.35)")
            }
          >
            <LogOut size={14} /> Sign out
          </button>
        </div>
      </aside>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40,
          }}
        />
      )}

      <main style={{ flex: 1, minHeight: "100vh" }} className="md:ml-[252px]">
        <div
          className="flex md:hidden items-center sticky top-0 z-30 h-[60px] bg-white px-7 gap-3.5"
          style={{
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}
        >
          <button
            onClick={() => setOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "var(--color-ink)",
            }}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              color: "var(--color-ink)",
            }}
          >
            Admin Panel
          </span>
        </div>
        <div style={{ padding: "32px 28px" }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
