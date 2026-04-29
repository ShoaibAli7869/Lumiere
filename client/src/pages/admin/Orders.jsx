import { useEffect, useState } from "react";
import api from "../../services/api";
import toast from "react-hot-toast";

const STATUS = ["pending", "paid", "shipped", "delivered", "cancelled"];
const statusColor = {
  pending: "#C9A84C",
  paid: "#2D7A4F",
  shipped: "#3B7DD8",
  delivered: "#1C1610",
  cancelled: "#E53E3E",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [updating, setUpdating] = useState(null);

  const load = async () => {
    const r = await api.get(`/orders?page=${page}&limit=15`);
    setOrders(r.data.orders || []);
    setTotal(r.data.total || 0);
  };

  useEffect(() => {
    load();
  }, [page]);

  const handleStatus = async (id, status) => {
    setUpdating(id);
    try {
      await api.patch(`/orders/${id}`, { orderStatus: status });
      toast.success("Status updated");
      load();
    } catch {
      toast.error("Failed");
    } finally {
      setUpdating(null);
    }
  };

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);
  const pages = Math.ceil(total / 15);

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
          Orders
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--color-ink-soft)",
          }}
        >
          {total} total orders
        </p>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        <div style={{ overflowX: "auto" }}>
          <table
            style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}
          >
            <thead>
              <tr style={{ background: "var(--color-canvas)" }}>
                {[
                  "Order",
                  "Customer",
                  "Items",
                  "Total",
                  "Payment",
                  "Status",
                  "Date",
                  "Update",
                ].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "11px 16px",
                      textAlign: "left",
                      fontFamily: "var(--font-sans)",
                      fontSize: 11,
                      fontWeight: 600,
                      color: "var(--color-ink-soft)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      whiteSpace: "nowrap",
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
                    colSpan={8}
                    style={{
                      padding: 40,
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
                      padding: "13px 16px",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      color: "var(--color-ink-soft)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    #{o._id.slice(-6).toUpperCase()}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        color: "var(--color-ink)",
                        fontWeight: 500,
                      }}
                    >
                      {o.user?.name || "—"}
                    </div>
                    <div
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 11,
                        color: "var(--color-ink-soft)",
                      }}
                    >
                      {o.user?.email}
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      color: "var(--color-ink)",
                    }}
                  >
                    {o.items?.length || 0}
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontFamily: "var(--font-serif)",
                      fontSize: 15,
                    }}
                  >
                    {fmt(o.totalAmount)}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 50,
                        fontSize: 11,
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        background:
                          o.paymentStatus === "paid"
                            ? "rgba(45,122,79,0.1)"
                            : "rgba(0,0,0,0.05)",
                        color: o.paymentStatus === "paid" ? "#2D7A4F" : "#999",
                      }}
                    >
                      {o.paymentStatus}
                    </span>
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: 50,
                        fontSize: 11,
                        fontFamily: "var(--font-sans)",
                        fontWeight: 600,
                        background:
                          (statusColor[o.orderStatus] || "#999") + "15",
                        color: statusColor[o.orderStatus] || "#999",
                      }}
                    >
                      {o.orderStatus}
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "13px 16px",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      color: "var(--color-ink-soft)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {new Date(o.createdAt).toLocaleDateString()}
                  </td>
                  <td style={{ padding: "13px 16px" }}>
                    <select
                      value={o.orderStatus}
                      disabled={updating === o._id}
                      onChange={(e) => handleStatus(o._id, e.target.value)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: "1px solid rgba(0,0,0,0.12)",
                        fontFamily: "var(--font-sans)",
                        fontSize: 12,
                        outline: "none",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {STATUS.map((s) => (
                        <option key={s} value={s}>
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pages > 1 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 18px",
              borderTop: "1px solid rgba(0,0,0,0.06)",
              justifyContent: "flex-end",
            }}
          >
            {Array.from({ length: pages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setPage(i + 1)}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 6,
                  border: "1px solid",
                  borderColor:
                    page === i + 1
                      ? "var(--color-cta-dark)"
                      : "rgba(0,0,0,0.1)",
                  background:
                    page === i + 1 ? "var(--color-cta-dark)" : "transparent",
                  color: page === i + 1 ? "#fff" : "var(--color-ink)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
