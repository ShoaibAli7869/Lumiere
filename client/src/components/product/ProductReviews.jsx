import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import toast from "react-hot-toast";
import { getReviews, createReview } from "../../services/reviewService";
import { useAuthStore } from "../../store/authStore";

function Stars({ value, interactive = false, onChange }) {
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={interactive ? 22 : 14}
          fill={
            (interactive ? hover || value : value) >= n
              ? "var(--color-cta)"
              : "none"
          }
          stroke={
            (interactive ? hover || value : value) >= n
              ? "var(--color-cta)"
              : "rgba(0,0,0,0.2)"
          }
          style={{
            cursor: interactive ? "pointer" : "default",
            transition: "fill 0.1s",
          }}
          onMouseEnter={() => interactive && setHover(n)}
          onMouseLeave={() => interactive && setHover(0)}
          onClick={() => interactive && onChange?.(n)}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, onDelete, isAdmin }) {
  return (
    <div
      style={{ padding: "22px 0", borderBottom: "1px solid rgba(0,0,0,0.06)" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "var(--color-canvas-alt)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-serif)",
              fontSize: 16,
              color: "var(--color-cta-dark)",
            }}
          >
            {review.user?.name?.[0]?.toUpperCase()}
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13,
                fontWeight: 600,
                color: "var(--color-ink)",
              }}
            >
              {review.user?.name}
              {review.verifiedPurchase && (
                <span
                  style={{
                    marginLeft: 8,
                    fontSize: 10,
                    color: "#2D7A4F",
                    fontWeight: 400,
                    background: "rgba(45,122,79,0.1)",
                    padding: "1px 7px",
                    borderRadius: 50,
                  }}
                >
                  Verified Purchase
                </span>
              )}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginTop: 3,
              }}
            >
              <Stars value={review.rating} />
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 11,
                  color: "var(--color-ink-soft)",
                }}
              >
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        {isAdmin && (
          <button
            onClick={() => onDelete(review._id)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: 11,
              color: "#E53E3E",
              padding: "3px 8px",
            }}
          >
            Remove
          </button>
        )}
      </div>
      {review.title && (
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: 16,
            color: "var(--color-ink)",
            marginBottom: 4,
          }}
        >
          {review.title}
        </div>
      )}
      <p
        style={{
          fontFamily: "var(--font-sans)",
          fontSize: 13,
          color: "var(--color-ink-soft)",
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {review.body}
      </p>
    </div>
  );
}

export default function ProductReviews({ productId }) {
  const { user } = useAuthStore();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ rating: 0, title: "", body: "" });
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const load = () => {
    setLoading(true);
    getReviews(productId)
      .then(setReviews)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, [productId]);

  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const handleSubmit = async () => {
    if (!form.rating) {
      toast.error("Please select a rating");
      return;
    }
    if (!form.body.trim()) {
      toast.error("Please write a review");
      return;
    }
    setSubmitting(true);
    try {
      const rev = await createReview(productId, form);
      setReviews((r) => [rev, ...r]);
      setForm({ rating: 0, title: "", body: "" });
      setShowForm(false);
      toast.success("Review submitted");
    } catch (e) {
      toast.error(e.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const { deleteReview } = await import("../../services/reviewService");
      await deleteReview(id);
      setReviews((r) => r.filter((x) => x._id !== id));
      toast.success("Review removed");
    } catch {
      toast.error("Failed");
    }
  };

  return (
    <section style={{ marginTop: 64 }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 32,
          paddingBottom: 20,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 28,
              color: "var(--color-ink)",
              marginBottom: 6,
            }}
          >
            Customer Reviews
          </h2>
          {avgRating && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Stars value={Math.round(Number(avgRating))} />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 20,
                  color: "var(--color-ink)",
                }}
              >
                {avgRating}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  color: "var(--color-ink-soft)",
                }}
              >
                ({reviews.length} {reviews.length === 1 ? "review" : "reviews"})
              </span>
            </div>
          )}
        </div>
        {user && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "10px 24px",
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
            Write a Review
          </button>
        )}
      </div>

      {/* Review form */}
      {showForm && user && (
        <div
          style={{
            background: "var(--color-canvas-alt)",
            borderRadius: 12,
            padding: 28,
            marginBottom: 36,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 20,
              color: "var(--color-ink)",
              marginBottom: 20,
            }}
          >
            Your Review
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--color-ink-soft)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 8,
                }}
              >
                Rating
              </div>
              <Stars
                value={form.rating}
                interactive
                onChange={(n) => setForm((f) => ({ ...f, rating: n }))}
              />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--color-ink-soft)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 6,
                }}
              >
                Title (optional)
              </div>
              <input
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                placeholder="Summarize your experience"
                style={{
                  width: "100%",
                  padding: "10px 14px",
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
            <div>
              <div
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 12,
                  fontWeight: 600,
                  color: "var(--color-ink-soft)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: 6,
                }}
              >
                Review
              </div>
              <textarea
                value={form.body}
                onChange={(e) =>
                  setForm((f) => ({ ...f, body: e.target.value }))
                }
                placeholder="Tell others about your experience with this product…"
                rows={4}
                style={{
                  width: "100%",
                  padding: "10px 14px",
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.12)",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                  outline: "none",
                  resize: "vertical",
                  boxSizing: "border-box",
                  background: "#fff",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                onClick={handleSubmit}
                disabled={submitting}
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
                {submitting ? "Submitting…" : "Submit Review"}
              </button>
              <button
                onClick={() => setShowForm(false)}
                style={{
                  padding: "10px 20px",
                  borderRadius: 50,
                  background: "transparent",
                  color: "var(--color-ink-soft)",
                  border: "1px solid rgba(0,0,0,0.15)",
                  cursor: "pointer",
                  fontFamily: "var(--font-sans)",
                  fontSize: 13,
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews list */}
      {loading && (
        <div
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            color: "var(--color-ink-soft)",
            padding: "20px 0",
          }}
        >
          Loading reviews…
        </div>
      )}
      {!loading && reviews.length === 0 && (
        <div style={{ textAlign: "center", padding: "48px 0" }}>
          <div
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 22,
              color: "var(--color-ink)",
              marginBottom: 8,
            }}
          >
            No reviews yet
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              color: "var(--color-ink-soft)",
            }}
          >
            Be the first to share your experience.
          </div>
        </div>
      )}
      {reviews.map((r) => (
        <ReviewCard
          key={r._id}
          review={r}
          isAdmin={user?.role === "admin"}
          onDelete={handleDelete}
        />
      ))}
    </section>
  );
}
