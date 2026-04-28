import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(form.email, form.password);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "var(--color-canvas)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "440px" }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            display: "block",
            textAlign: "center",
            marginBottom: "2.5rem",
            fontFamily: "var(--font-serif)",
            fontSize: "2rem",
            fontWeight: 400,
            color: "var(--color-ink)",
            textDecoration: "none",
          }}
        >
          Lumiere
        </Link>

        <div className="card" style={{ padding: "2.5rem" }}>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.9rem",
              fontWeight: 400,
              marginBottom: "0.4rem",
              color: "var(--color-ink)",
            }}
          >
            Welcome back
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              color: "var(--color-ink-soft)",
              marginBottom: "2rem",
            }}
          >
            Sign in to your account
          </p>

          <form
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <Field label="Email address">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
                autoComplete="email"
                placeholder="you@example.com"
                style={inputStyle}
              />
            </Field>

            <Field label="Password">
              <div style={{ position: "relative" }}>
                <input
                  name="password"
                  type={show ? "text" : "password"}
                  value={form.password}
                  onChange={onChange}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••"
                  style={{ ...inputStyle, paddingRight: "2.75rem" }}
                />
                <button
                  type="button"
                  onClick={() => setShow((s) => !s)}
                  style={{
                    position: "absolute",
                    right: "0.85rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "var(--color-ink-soft)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                padding: "0.75rem",
                marginTop: "0.5rem",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in…" : "Sign In"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "1.5rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              color: "var(--color-ink-soft)",
            }}
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              style={{
                color: "var(--color-cta-dark)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontFamily: "var(--font-sans)",
          fontSize: "0.78rem",
          fontWeight: 600,
          color: "var(--color-ink)",
          marginBottom: "0.4rem",
          letterSpacing: "0.04em",
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.65rem 0.9rem",
  border: "1px solid rgba(0,0,0,0.15)",
  borderRadius: "8px",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  color: "var(--color-ink)",
  background: "#fff",
  outline: "none",
  transition: "border-color 0.2s",
};
