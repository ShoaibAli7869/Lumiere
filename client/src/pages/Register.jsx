import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet-async";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6)
      return toast.error("Password must be at least 6 characters");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };
  <Helmet>
    <title>Create Account </title>
  </Helmet>;
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
            }}
          >
            Create account
          </h1>
          <p
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.85rem",
              color: "var(--color-ink-soft)",
              marginBottom: "2rem",
            }}
          >
            Join Lumiere for exclusive access
          </p>

          <form
            onSubmit={onSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
          >
            <Field label="Full name">
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={onChange}
                required
                placeholder="Jane Doe"
                style={inputStyle}
              />
            </Field>

            <Field label="Email address">
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
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
                  placeholder="Min. 6 characters"
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
              {loading ? "Creating account…" : "Create Account"}
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
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "var(--color-cta-dark)",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign in
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
