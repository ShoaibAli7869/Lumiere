export default function ProductFilters({ filters, setFilters, categories }) {
  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val, page: 1 }));

  return (
    <aside style={{ width: "220px", flexShrink: 0 }}>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "1.3rem",
          fontWeight: 400,
          marginBottom: "1.5rem",
        }}
      >
        Filters
      </h3>

      {/* Category */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={labelStyle}>Category</p>
        {[{ _id: "", name: "All" }, ...categories].map((c) => (
          <button
            key={c._id}
            onClick={() => set("category", c._id)}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              padding: "0.35rem 0",
              color:
                filters.category === c._id
                  ? "var(--color-cta-dark)"
                  : "var(--color-ink-soft)",
              fontWeight: filters.category === c._id ? 600 : 400,
            }}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Price */}
      <div style={{ marginBottom: "2rem" }}>
        <p style={labelStyle}>Price Range</p>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) => set("minPrice", e.target.value)}
            style={inputStyle}
          />
          <span style={{ color: "var(--color-ink-soft)", fontSize: "0.8rem" }}>
            —
          </span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice || ""}
            onChange={(e) => set("maxPrice", e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <p style={labelStyle}>Sort By</p>
        {[
          { label: "Newest", sort: "createdAt", order: "desc" },
          { label: "Price: Low–High", sort: "price", order: "asc" },
          { label: "Price: High–Low", sort: "price", order: "desc" },
        ].map((o) => (
          <button
            key={o.label}
            onClick={() =>
              setFilters((f) => ({
                ...f,
                sort: o.sort,
                order: o.order,
                page: 1,
              }))
            }
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              padding: "0.35rem 0",
              color:
                filters.sort === o.sort && filters.order === o.order
                  ? "var(--color-cta-dark)"
                  : "var(--color-ink-soft)",
              fontWeight:
                filters.sort === o.sort && filters.order === o.order
                  ? 600
                  : 400,
            }}
          >
            {o.label}
          </button>
        ))}
      </div>

      {/* Reset */}
      <button
        onClick={() =>
          setFilters({ page: 1, sort: "createdAt", order: "desc" })
        }
        className="btn btn-outline"
        style={{ marginTop: "2rem", width: "100%", fontSize: "0.8rem" }}
      >
        Reset Filters
      </button>
    </aside>
  );
}

const labelStyle = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.72rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--color-ink)",
  marginBottom: "0.75rem",
};

const inputStyle = {
  width: "80px",
  padding: "0.4rem 0.6rem",
  border: "1px solid rgba(0,0,0,0.15)",
  borderRadius: "8px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.82rem",
  color: "var(--color-ink)",
  background: "#fff",
  outline: "none",
};
