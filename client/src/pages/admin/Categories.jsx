import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import api from "../../services/api";
import toast from "react-hot-toast";

export default function Categories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [loading, setLoading] = useState(false);

  const load = () =>
    api
      .get("/products/categories")
      .then((r) => setCats(r.data.categories || []));

  useEffect(() => {
    load();
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setLoading(true);
    try {
      await api.post("/products/categories", {
        name: name.trim(),
        slug: slug.trim() || name.trim().toLowerCase().replace(/\s+/g, "-"),
      });
      toast.success("Category created");
      setName("");
      setSlug("");
      load();
    } catch {
      toast.error("Failed to create");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this category?")) return;
    try {
      await api.delete(`/products/categories/${id}`);
      toast.success("Deleted");
      load();
    } catch {
      toast.error("Failed to delete");
    }
  };

  return (
    <div style={{ maxWidth: 640 }}>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 30,
            color: "var(--color-ink)",
            marginBottom: 4,
          }}
        >
          Categories
        </h1>
        <p
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--color-ink-soft)",
          }}
        >
          Manage product categories
        </p>
      </div>

      {/* Create form */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          padding: 24,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          marginBottom: 24,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--color-ink)",
            marginBottom: 16,
          }}
        >
          New Category
        </div>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name e.g. Necklaces"
            style={{
              flex: 1,
              minWidth: 160,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.12)",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              outline: "none",
            }}
          />
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            placeholder="Slug (auto if empty)"
            style={{
              flex: 1,
              minWidth: 160,
              padding: "10px 14px",
              borderRadius: 8,
              border: "1px solid rgba(0,0,0,0.12)",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              outline: "none",
            }}
          />
          <button
            onClick={handleCreate}
            disabled={loading}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 20px",
              borderRadius: 50,
              background: "var(--color-cta-dark)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: 13,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            <Plus size={15} /> Add
          </button>
        </div>
      </div>

      {/* List */}
      <div
        style={{
          background: "#fff",
          borderRadius: 12,
          boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
          overflow: "hidden",
        }}
      >
        {cats.length === 0 && (
          <div
            style={{
              padding: 32,
              textAlign: "center",
              fontFamily: "var(--font-sans)",
              color: "var(--color-ink-soft)",
            }}
          >
            No categories yet
          </div>
        )}
        {cats.map((c, i) => (
          <div
            key={c._id}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 20px",
              borderTop: i > 0 ? "1px solid rgba(0,0,0,0.05)" : "none",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 14,
                  color: "var(--color-ink)",
                  fontWeight: 500,
                }}
              >
                {c.name}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--color-ink-soft)",
                  marginTop: 1,
                }}
              >
                {c.slug}
              </div>
            </div>
            <button
              onClick={() => handleDelete(c._id)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#ccc",
                padding: 4,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#E53E3E")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#ccc")}
            >
              <Trash2 size={15} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
