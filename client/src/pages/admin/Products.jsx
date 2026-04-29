import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Upload } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

const empty = {
  name: "",
  description: "",
  price: "",
  comparePrice: "",
  category: "",
  stock: "",
  featured: false,
  images: [],
};

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cats, setCats] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const r = await api.get(`/products?page=${page}&limit=12`);
    setProducts(r.data.products);
    setTotal(r.data.total);
  };

  useEffect(() => {
    load();
  }, [page]);
  useEffect(() => {
    api
      .get("/products/categories")
      .then((r) => setCats(r.data.categories || []));
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setModal(true);
  };
  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      comparePrice: p.comparePrice || "",
      category: p.category?._id || "",
      stock: p.stock,
      featured: p.featured,
      images: p.images || [],
    });
    setModal(true);
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const r = await api.post("/upload", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setForm((f) => ({
        ...f,
        images: [...f.images, { url: r.data.url, public_id: r.data.public_id }],
      }));
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const removeImg = (idx) =>
    setForm((f) => ({ ...f, images: f.images.filter((_, i) => i !== idx) }));

  const handleSave = async () => {
    if (!form.name || !form.price) {
      toast.error("Name and price required");
      return;
    }
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        comparePrice: Number(form.comparePrice) || undefined,
        stock: Number(form.stock) || 0,
      };
      if (editing) await api.patch(`/products/${editing._id}`, payload);
      else await api.post("/products", payload);
      toast.success(editing ? "Product updated" : "Product created");
      setModal(false);
      load();
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await api.delete(`/products/${id}`);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Failed");
    }
  };

  const fmt = (n) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(n);
  const pages = Math.ceil(total / 12);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 30,
              color: "var(--color-ink)",
              marginBottom: 4,
            }}
          >
            Products
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "var(--color-ink-soft)",
            }}
          >
            {total} total products
          </p>
        </div>
        <button
          onClick={openCreate}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 7,
            padding: "10px 22px",
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
          <Plus size={15} /> New Product
        </button>
      </div>

      {/* Table */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--color-canvas)" }}>
              {["Product", "Category", "Price", "Stock", "Featured", ""].map(
                (h) => (
                  <th
                    key={h}
                    style={{
                      padding: "11px 18px",
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
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {products.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    padding: 40,
                    textAlign: "center",
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-ink-soft)",
                  }}
                >
                  No products yet
                </td>
              </tr>
            )}
            {products.map((p) => (
              <tr
                key={p._id}
                style={{ borderTop: "1px solid rgba(0,0,0,0.05)" }}
              >
                <td style={{ padding: "12px 18px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 12 }}
                  >
                    {p.images?.[0] ? (
                      <img
                        src={p.images[0].url}
                        alt={p.name}
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          objectFit: "cover",
                          background: "var(--color-canvas-alt)",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 8,
                          background: "var(--color-canvas-alt)",
                        }}
                      />
                    )}
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 13,
                        color: "var(--color-ink)",
                        fontWeight: 500,
                      }}
                    >
                      {p.name}
                    </span>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    color: "var(--color-ink-soft)",
                  }}
                >
                  {p.category?.name || "—"}
                </td>
                <td
                  style={{
                    padding: "12px 18px",
                    fontFamily: "var(--font-serif)",
                    fontSize: 15,
                    color: "var(--color-ink)",
                  }}
                >
                  {fmt(p.price)}
                </td>
                <td
                  style={{
                    padding: "12px 18px",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: p.stock < 5 ? "#E53E3E" : "var(--color-ink)",
                  }}
                >
                  {p.stock}
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <span
                    style={{
                      padding: "2px 10px",
                      borderRadius: 50,
                      fontSize: 11,
                      fontFamily: "var(--font-sans)",
                      fontWeight: 600,
                      background: p.featured
                        ? "rgba(201,168,76,0.12)"
                        : "rgba(0,0,0,0.04)",
                      color: p.featured
                        ? "var(--color-cta-dark)"
                        : "var(--color-ink-soft)",
                    }}
                  >
                    {p.featured ? "Yes" : "No"}
                  </span>
                </td>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => openEdit(p)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--color-ink-soft)",
                        padding: 4,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-cta-dark)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--color-ink-soft)")
                      }
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(p._id)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "var(--color-ink-soft)",
                        padding: 4,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#E53E3E")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--color-ink-soft)")
                      }
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

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

      {/* Modal */}
      {modal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.45)",
            zIndex: 100,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "40px 16px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: 16,
              width: "100%",
              maxWidth: 580,
              padding: 32,
              position: "relative",
            }}
          >
            <button
              onClick={() => setModal(false)}
              style={{
                position: "absolute",
                top: 18,
                right: 18,
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "var(--color-ink-soft)",
              }}
            >
              <X size={18} />
            </button>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: 24,
                color: "var(--color-ink)",
                marginBottom: 24,
              }}
            >
              {editing ? "Edit Product" : "New Product"}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {/* Images */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: 12,
                    fontWeight: 600,
                    color: "var(--color-ink-soft)",
                    marginBottom: 8,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                  }}
                >
                  Images
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    flexWrap: "wrap",
                    alignItems: "center",
                  }}
                >
                  {form.images.map((img, i) => (
                    <div key={i} style={{ position: "relative" }}>
                      <img
                        src={img.url}
                        style={{
                          width: 72,
                          height: 72,
                          borderRadius: 8,
                          objectFit: "cover",
                          background: "var(--color-canvas-alt)",
                        }}
                      />
                      <button
                        onClick={() => removeImg(i)}
                        style={{
                          position: "absolute",
                          top: -6,
                          right: -6,
                          width: 18,
                          height: 18,
                          borderRadius: 50,
                          background: "#E53E3E",
                          border: "none",
                          color: "#fff",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <X size={10} />
                      </button>
                    </div>
                  ))}
                  <label
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 8,
                      border: "1.5px dashed rgba(0,0,0,0.15)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      gap: 4,
                    }}
                  >
                    {uploading ? (
                      <span
                        style={{
                          fontFamily: "var(--font-sans)",
                          fontSize: 11,
                          color: "var(--color-ink-soft)",
                        }}
                      >
                        ...
                      </span>
                    ) : (
                      <>
                        <Upload size={16} color="var(--color-ink-soft)" />
                        <span
                          style={{
                            fontFamily: "var(--font-sans)",
                            fontSize: 10,
                            color: "var(--color-ink-soft)",
                          }}
                        >
                          Upload
                        </span>
                      </>
                    )}
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleImage}
                      disabled={uploading}
                    />
                  </label>
                </div>
              </div>

              {/* Form fields */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 14,
                }}
              >
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-ink-soft)",
                      marginBottom: 6,
                    }}
                  >
                    Name
                  </label>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-ink-soft)",
                      marginBottom: 6,
                    }}
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    value={form.price}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, price: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-ink-soft)",
                      marginBottom: 6,
                    }}
                  >
                    Compare at Price
                  </label>
                  <input
                    type="number"
                    value={form.comparePrice}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, comparePrice: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-ink-soft)",
                      marginBottom: 6,
                    }}
                  >
                    Category
                  </label>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, category: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                      background: "#fff",
                    }}
                  >
                    <option value="">Select...</option>
                    {cats.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-ink-soft)",
                      marginBottom: 6,
                    }}
                  >
                    Stock
                  </label>
                  <input
                    type="number"
                    value={form.stock}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, stock: e.target.value }))
                    }
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans)",
                      fontSize: 12,
                      fontWeight: 600,
                      color: "var(--color-ink-soft)",
                      marginBottom: 6,
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={form.description}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, description: e.target.value }))
                    }
                    rows={3}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: 8,
                      border: "1px solid rgba(0,0,0,0.15)",
                      fontFamily: "var(--font-sans)",
                      fontSize: 13,
                      outline: "none",
                      boxSizing: "border-box",
                      resize: "vertical",
                    }}
                  />
                </div>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    color: "var(--color-ink)",
                    cursor: "pointer",
                    gridColumn: "1 / -1",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={form.featured}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, featured: e.target.checked }))
                    }
                  />
                  Featured Product
                </label>
              </div>

              {/* Actions */}
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 16,
                  justifyContent: "flex-end",
                }}
              >
                <button
                  onClick={() => setModal(false)}
                  style={{
                    padding: "10px 20px",
                    borderRadius: 50,
                    background: "transparent",
                    color: "var(--color-ink)",
                    border: "1px solid rgba(0,0,0,0.15)",
                    cursor: "pointer",
                    fontFamily: "var(--font-sans)",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  style={{
                    padding: "10px 28px",
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
                  {saving ? "Saving..." : "Save Product"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
