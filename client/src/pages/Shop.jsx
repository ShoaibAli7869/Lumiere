import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useProducts } from "@/hooks/useProducts";
import { productService } from "@/services/productService";
import ProductCard from "@/components/product/ProductCard";
import ProductFilters from "@/components/product/ProductFilters";
import { ProductCardSkeleton } from "../components/ui/Skeleton";

export default function Shop() {
  const [filters, setFilters] = useState({
    page: 1,
    sort: "createdAt",
    order: "desc",
  });
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const { products, pages, loading } = useProducts({
    ...filters,
    search: search || undefined,
  });

  useEffect(() => {
    productService
      .getCategories()
      .then(({ data }) => setCategories(data.categories || []));
  }, []);

  return (
    <>
      {/* FIX: Helmet must be returned as JSX, not called as a floating expression */}
      <Helmet>
        <title>Shop — Lumière</title>
        <meta
          name="description"
          content="Browse our full collection of handcrafted necklaces, earrings, bracelets and rings."
        />
      </Helmet>

      <div style={{ background: "var(--color-canvas)", minHeight: "100vh" }}>
        <div
          style={{
            background: "var(--color-band-dark)",
            padding: "3rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "2.8rem",
              fontWeight: 400,
              color: "#fff",
              marginBottom: "0.5rem",
            }}
          >
            Shop Collection
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--color-on-dark-soft)",
            }}
          >
            Handcrafted fine jewelry for every occasion
          </p>
        </div>

        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 2rem" }}
        >
          {/* Search bar */}
          <div
            style={{
              position: "relative",
              maxWidth: "480px",
              marginBottom: "3rem",
            }}
          >
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--color-ink-soft)",
              }}
            />
            <input
              type="text"
              placeholder="Search jewelry…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: "100%",
                padding: "0.7rem 1rem 0.7rem 2.75rem",
                border: "1px solid rgba(0,0,0,0.15)",
                borderRadius: "50px",
                fontFamily: "var(--font-sans)",
                fontSize: "0.88rem",
                background: "#fff",
                outline: "none",
                color: "var(--color-ink)",
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-start">
            <ProductFilters
              filters={filters}
              setFilters={setFilters}
              categories={categories}
            />

            <div style={{ flex: 1 }}>
              {loading ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(240px, 1fr))",
                    gap: 24,
                  }}
                >
                  {Array.from({ length: 8 }).map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              ) : products.length === 0 ? (
                <div style={{ textAlign: "center", padding: "5rem 0" }}>
                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.5rem",
                      color: "var(--color-ink-soft)",
                    }}
                  >
                    No products found
                  </p>
                  <button
                    onClick={() => {
                      setFilters({ page: 1, sort: "createdAt", order: "desc" });
                      setSearch("");
                    }}
                    className="btn btn-outline"
                    style={{ marginTop: "1rem" }}
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {products.map((p) => (
                      <ProductCard key={p._id} product={p} />
                    ))}
                  </div>

                  {pages > 1 && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "0.5rem",
                        marginTop: "3rem",
                      }}
                    >
                      {Array.from({ length: pages }, (_, i) => i + 1).map(
                        (p) => (
                          <button
                            key={p}
                            onClick={() =>
                              setFilters((f) => ({ ...f, page: p }))
                            }
                            style={{
                              width: "36px",
                              height: "36px",
                              borderRadius: "50%",
                              border: "1px solid",
                              cursor: "pointer",
                              fontFamily: "var(--font-sans)",
                              fontSize: "0.85rem",
                              background:
                                filters.page === p
                                  ? "var(--color-cta-dark)"
                                  : "transparent",
                              color:
                                filters.page === p
                                  ? "#fff"
                                  : "var(--color-ink)",
                              borderColor:
                                filters.page === p
                                  ? "var(--color-cta-dark)"
                                  : "rgba(0,0,0,0.15)",
                            }}
                          >
                            {p}
                          </button>
                        ),
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
