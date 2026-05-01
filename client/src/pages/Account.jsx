import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Package, User, Heart, ChevronRight, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";
import api from "../services/api";
import { OrderRowSkeleton } from "../components/ui/Skeleton";

const statusColor = {
  pending: { bg: "rgba(201,168,76,0.12)", text: "#9B6B0F" },
  paid: { bg: "rgba(45,122,79,0.1)", text: "#2D7A4F" },
  shipped: { bg: "rgba(59,125,216,0.1)", text: "#3B7DD8" },
  delivered: { bg: "rgba(28,22,16,0.08)", text: "#1C1610" },
  cancelled: { bg: "rgba(229,62,62,0.1)", text: "#E53E3E" },
};

function StatusBadge({ status }) {
  const c = statusColor[status] || { bg: "rgba(0,0,0,0.05)", text: "#999" };
  return (
    <span
      style={{
        padding: "3px 12px",
        borderRadius: 50,
        fontSize: 11,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        background: c.bg,
        color: c.text,
        whiteSpace: "nowrap",
      }}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}

// ── Orders Tab ─────────────────────────────────────────────────────────────
function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/orders/my")
      .then((r) => setOrders(r.data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);

  if (loading)
    return (
      <div>
        {[1, 2, 3].map((i) => (
          <OrderRowSkeleton key={i} />
        ))}
      </div>
    );

  if (orders.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "64px 0" }}>
        <Package
          size={40}
          style={{ color: "var(--color-cta)", margin: "0 auto 16px" }}
        />
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            color: "var(--color-ink)",
            marginBottom: 8,
          }}
        >
          No orders yet
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--color-ink-soft)",
            marginBottom: 24,
          }}
        >
          When you place an order it will appear here.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Start Shopping
        </Link>
      </div>
    );

  return (
    <div>
      {/* Header row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr 1fr 36px",
          gap: 12,
          padding: "0 0 10px",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          marginBottom: 4,
        }}
      >
        {["Order", "Items", "Total", "Status", ""].map((h) => (
          <div
            key={h}
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              fontWeight: 600,
              color: "var(--color-ink-soft)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {h}
          </div>
        ))}
      </div>

      {orders.map((o) => (
        <Link
          key={o._id}
          to={`/account/orders/${o._id}`}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr 1fr 1fr 36px",
            gap: 12,
            alignItems: "center",
            padding: "16px 0",
            borderBottom: "1px solid rgba(0,0,0,0.05)",
            textDecoration: "none",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.015)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "transparent")
          }
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 12,
                color: "var(--color-ink-soft)",
                marginBottom: 2,
              }}
            >
              #{o._id.slice(-6).toUpperCase()}
            </div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 11,
                color: "var(--color-ink-soft)",
              }}
            >
              {new Date(o.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {o.items?.slice(0, 3).map((item, i) => (
              <div
                key={i}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 6,
                  background: "var(--color-canvas-alt)",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                )}
              </div>
            ))}
            {(o.items?.length || 0) > 3 && (
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--color-ink-soft)",
                }}
              >
                +{o.items.length - 3} more
              </div>
            )}
          </div>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              color: "var(--color-ink)",
            }}
          >
            {fmt(o.totalAmount)}
          </div>
          <StatusBadge status={o.orderStatus} />
          <ChevronRight size={15} style={{ color: "var(--color-ink-soft)" }} />
        </Link>
      ))}
    </div>
  );
}

// ── Profile Tab ────────────────────────────────────────────────────────────
function ProfileTab() {
  const { user, setUser } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!form.name.trim()) {
      toast.error("Name is required");
      return;
    }
    setSaving(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.newPassword) {
        if (!form.currentPassword) {
          toast.error("Enter your current password");
          setSaving(false);
          return;
        }
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }
      const r = await api.patch("/auth/profile", payload);
      setUser(r.data);
      toast.success("Profile updated");
      setForm((f) => ({ ...f, currentPassword: "", newPassword: "" }));
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const field = (label, key, type = "text", placeholder = "") => (
    <div key={key}>
      <div
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 11,
          fontWeight: 600,
          color: "var(--color-ink-soft)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: 6,
        }}
      >
        {label}
      </div>
      <input
        type={type}
        value={form[key]}
        placeholder={placeholder}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        style={{
          width: "100%",
          padding: "11px 14px",
          borderRadius: 8,
          border: "1px solid rgba(0,0,0,0.12)",
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          outline: "none",
          boxSizing: "border-box",
          background: "#fff",
        }}
      />
    </div>
  );

  return (
    <div style={{ maxWidth: 480 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--color-ink)",
            paddingBottom: 6,
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            marginBottom: 4,
          }}
        >
          Personal Info
        </div>
        {field("Full Name", "name")}
        {field("Email", "email", "email")}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--color-ink)",
            paddingBottom: 6,
            borderBottom: "1px solid rgba(0,0,0,0.07)",
            marginBottom: 4,
          }}
        >
          Change Password
        </div>
        {field(
          "Current Password",
          "currentPassword",
          "password",
          "Leave blank to keep current",
        )}
        {field("New Password", "newPassword", "password", "Min 6 characters")}
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        style={{
          padding: "12px 36px",
          borderRadius: 50,
          background: "var(--color-cta-dark)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          fontWeight: 600,
        }}
      >
        {saving ? "Saving…" : "Save Changes"}
      </button>
    </div>
  );
}

// ── Wishlist Tab ───────────────────────────────────────────────────────────
function WishlistTab() {
  const { ids, toggle } = useWishlistStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) {
      setLoading(false);
      return;
    }
    api
      .get("/wishlist")
      .then((r) => setItems(r.data.wishlist || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ids.length]);

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);

  if (loading)
    return (
      <div
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-ink-soft)",
          padding: "20px 0",
        }}
      >
        Loading…
      </div>
    );

  if (ids.length === 0 || items.length === 0)
    return (
      <div style={{ textAlign: "center", padding: "64px 0" }}>
        <Heart
          size={40}
          style={{ color: "var(--color-cta)", margin: "0 auto 16px" }}
        />
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 22,
            color: "var(--color-ink)",
            marginBottom: 8,
          }}
        >
          Your wishlist is empty
        </div>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--color-ink-soft)",
            marginBottom: 24,
          }}
        >
          Save pieces you love and find them here.
        </p>
        <Link to="/shop" className="btn btn-primary">
          Browse Collection
        </Link>
      </div>
    );

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
        gap: 20,
      }}
    >
      {items.map((p) => (
        <div
          key={p._id}
          style={{
            background: "#fff",
            borderRadius: 12,
            overflow: "hidden",
            boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            position: "relative",
          }}
        >
          <Link to={`/product/${p._id}`}>
            <div
              style={{
                aspectRatio: "1",
                background: "var(--color-canvas-alt)",
                overflow: "hidden",
              }}
            >
              {p.images?.[0] && (
                <img
                  src={p.images[0].url}
                  alt={p.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              )}
            </div>
          </Link>
          <button
            onClick={() => toggle(p._id)}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
            }}
          >
            <Heart
              size={14}
              fill="var(--color-cta)"
              stroke="var(--color-cta)"
            />
          </button>
          <div style={{ padding: "12px 14px" }}>
            <Link to={`/product/${p._id}`} style={{ textDecoration: "none" }}>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--color-ink)",
                  fontWeight: 500,
                  marginBottom: 4,
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {p.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 16,
                  color: "var(--color-ink)",
                }}
              >
                {fmt(p.price)}
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Main Account Page ──────────────────────────────────────────────────────
const TABS = [
  { key: "orders", label: "Orders", icon: Package },
  { key: "profile", label: "Profile", icon: User },
  { key: "wishlist", label: "Wishlist", icon: Heart },
];

export default function Account() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [active, setActive] = useState("orders");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        background: "var(--color-canvas)",
        minHeight: "100vh",
        padding: "4rem 2rem",
      }}
    >
      <Helmet>
        <title>Account | Lumiere</title>
      </Helmet>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 32,
            color: "var(--color-ink)",
            marginBottom: 32,
          }}
        >
          My Account
        </h1>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "240px 1fr",
            gap: 48,
            alignItems: "start",
          }}
        >
          <aside style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {TABS.map((t) => (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "12px 16px",
                  borderRadius: 8,
                  background:
                    active === t.key
                      ? "var(--color-canvas-alt)"
                      : "transparent",
                  border: "none",
                  cursor: "pointer",
                  textAlign: "left",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  fontWeight: active === t.key ? 600 : 400,
                  color:
                    active === t.key
                      ? "var(--color-ink)"
                      : "var(--color-ink-soft)",
                  transition: "background 0.2s",
                }}
              >
                <t.icon size={16} /> {t.label}
              </button>
            ))}
            <div
              style={{
                height: 1,
                background: "rgba(0,0,0,0.06)",
                margin: "8px 0",
              }}
            />
            <button
              onClick={handleLogout}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 16px",
                borderRadius: 8,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                color: "#E53E3E",
              }}
            >
              <LogOut size={16} /> Sign out
            </button>
          </aside>

          <main
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: 32,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              minHeight: 400,
            }}
          >
            {active === "orders" && <OrdersTab />}
            {active === "profile" && <ProfileTab />}
            {active === "wishlist" && <WishlistTab />}
          </main>
        </div>
      </div>
    </div>
  );
}
