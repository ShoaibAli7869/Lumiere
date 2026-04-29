import { useEffect, useState } from "react";
import { ShoppingBag, Package, Users, TrendingUp } from "lucide-react";
import api from "../../services/api";

function StatCard({ icon: Icon, label, value, sub, color }) {
  return (
    <div
      style={{
        background: "#fff",
        borderRadius: 12,
        padding: "24px 26px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        display: "flex",
        alignItems: "flex-start",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 10,
          background: color + "18",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <Icon size={20} style={{ color }} />
      </div>
      <div>
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 12,
            color: "var(--color-ink-soft)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: 4,
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 28,
            color: "var(--color-ink)",
            lineHeight: 1,
          }}
        >
          {value}
        </div>
        {sub && (
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 12,
              color: "var(--color-ink-soft)",
              marginTop: 4,
            }}
          >
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get("/orders?limit=5"), api.get("/products?limit=1")])
      .then(([ordersRes, productsRes]) => {
        const allOrders = ordersRes.data.orders || [];
        const revenue = allOrders.reduce((s, o) => s + (o.totalAmount || 0), 0);
        setStats({
          orders: ordersRes.data.total || allOrders.length,
          revenue,
          products: productsRes.data.total || 0,
        });
        setOrders(allOrders.slice(0, 5));
      })
      .finally(() => setLoading(false));
  }, []);

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);
  const statusColor = {
    pending: "#C9A84C",
    paid: "#2D7A4F",
    shipped: "#3B7DD8",
    delivered: "#1C1610",
    cancelled: "#E53E3E",
  };

  if (loading)
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: 18,
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              height: 96,
              background: "#fff",
              borderRadius: 12,
              animation: "pulse 1.5s infinite",
            }}
          />
        ))}
      </div>
    );

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 30,
            color: "var(--color-ink)",
            marginBottom: 4,
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--color-ink-soft)",
          }}
        >
          Welcome back. Here's what's happening.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))",
          gap: 18,
          marginBottom: 36,
        }}
      >
        <StatCard
          icon={ShoppingBag}
          label="Total Orders"
          value={stats?.orders ?? "—"}
          color="#C9A84C"
        />
        <StatCard
          icon={TrendingUp}
          label="Revenue"
          value={fmt(stats?.revenue ?? 0)}
          color="#2D7A4F"
        />
        <StatCard
          icon={Package}
          label="Products"
          value={stats?.products ?? "—"}
          color="#3B7DD8"
        />
        <StatCard
          icon={Users}
          label="Registered"
          value="—"
          color="#9B6B9B"
          sub="Connect users endpoint"
        />
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              color: "var(--color-ink)",
            }}
          >
            Recent Orders
          </h2>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--color-canvas)" }}>
              {["Order ID", "Customer", "Total", "Status", "Date"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 20px",
                    textAlign: "left",
                    fontFamily: "var(--font-sans)",
                    fontSize: 11,
                    fontWeight: 600,
                    color: "var(--color-ink-soft)",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    padding: "32px",
                    textAlign: "center",
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  No orders yet
                </td>
              </tr>
            )}
            {orders.map((o) => (
              <tr
                key={o._id}
                style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
              >
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    color: "var(--color-ink-soft)",
                  }}
                >
                  #{o._id.slice(-6).toUpperCase()}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "var(--color-ink)",
                  }}
                >
                  {o.user?.name || "—"}
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "var(--font-serif)",
                    fontSize: 15,
                    color: "var(--color-ink)",
                  }}
                >
                  {fmt(o.totalAmount)}
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span
                    style={{
                      padding: "3px 10px",
                      borderRadius: 50,
                      fontSize: 11,
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      background: (statusColor[o.orderStatus] || "#999") + "18",
                      color: statusColor[o.orderStatus] || "#999",
                    }}
                  >
                    {o.orderStatus}
                  </span>
                </td>
                <td
                  style={{
                    padding: "14px 20px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
