import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

/* ─── Styles ─────────────────────────────────────────────── */
const LOGIN_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink:         #1a1612;
    --ink-soft:    #5a4f45;
    --gold:        #C9A84C;
    --gold-light:  #e8d49a;
    --cream:       #fdf8f1;
    --canvas-alt:  #f3ede3;
    --border-gold: rgba(201,168,76,0.28);
    --f-bg:        #110f0c;
  }

  @keyframes lg-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes lg-fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes lg-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes lg-rotateSlow {
    from { transform: translate(-50%, -50%) rotate(0deg); }
    to   { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* ── page layout ── */
  .lg-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    background: var(--f-bg);
  }

  /* ── left: editorial photo panel ── */
  .lg-photo-panel {
    position: relative;
    overflow: hidden;
    animation: lg-fadeIn 0.9s ease both;
  }
  .lg-photo-panel img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.72) saturate(0.85);
  }
  /* gradient overlay */
  .lg-photo-panel::after {
    content: '';
    position: absolute; inset: 0;
    background:
      linear-gradient(to right, transparent 60%, rgba(17,15,12,0.7) 100%),
      linear-gradient(to bottom, transparent 40%, rgba(17,15,12,0.55) 100%);
    z-index: 1;
  }
  /* gold inset border */
  .lg-photo-panel::before {
    content: '';
    position: absolute;
    top: 16px; left: 16px; right: 16px; bottom: 16px;
    border: 0.5px solid rgba(201,168,76,0.25);
    z-index: 2;
    pointer-events: none;
  }
  /* quote overlay */
  .lg-photo-quote {
    position: absolute;
    bottom: 2.5rem;
    left: 2.5rem;
    right: 2.5rem;
    z-index: 3;
    animation: lg-fadeUp 0.8s ease both 0.4s;
  }
  .lg-photo-quote-line {
    width: 24px; height: 1px;
    background: var(--gold);
    margin-bottom: 0.7rem;
  }
  .lg-photo-quote p {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.35rem;
    font-weight: 300;
    font-style: italic;
    color: rgba(253,248,241,0.92);
    margin: 0 0 0.5rem;
    line-height: 1.45;
  }
  .lg-photo-quote span {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
  }

  /* ── right: form panel ── */
  .lg-form-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 3.5rem;
    background: var(--cream);
    position: relative;
    overflow: hidden;
    animation: lg-fadeUp 0.7s ease both 0.1s;
  }
  /* subtle grain */
  .lg-form-bg {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse 70% 60% at 50% 30%, rgba(201,168,76,0.05) 0%, transparent 65%);
    pointer-events: none;
  }
  /* top gold line */
  .lg-form-topline {
    position: absolute; top: 0; left: 0; right: 0;
    height: 1.5px;
    background: linear-gradient(to right, transparent, var(--gold), rgba(201,168,76,0.3), transparent);
  }

  .lg-form-inner {
    width: 100%;
    max-width: 380px;
    position: relative;
    z-index: 1;
  }

  /* logo */
  .lg-logo {
    display: block;
    text-align: center;
    margin-bottom: 2.8rem;
    font-family: 'Cormorant Garamond', serif;
    font-size: 2rem;
    font-weight: 300;
    letter-spacing: 0.12em;
    color: var(--ink);
    text-decoration: none;
    line-height: 1;
    animation: lg-fadeUp 0.6s ease both 0.2s;
  }
  .lg-logo em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: lg-shimmer 5s linear 1s infinite;
  }

  /* heading block */
  .lg-heading-block {
    margin-bottom: 2rem;
    animation: lg-fadeUp 0.65s ease both 0.25s;
  }
  .lg-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.6rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .lg-eyebrow::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: var(--border-gold);
    max-width: 32px;
  }
  .lg-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: 2.2rem;
    font-weight: 300;
    color: var(--ink);
    margin: 0 0 0.3rem;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .lg-h1 em { font-style: italic; font-weight: 400; }
  .lg-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    font-weight: 300;
    color: var(--ink-soft);
    margin: 0;
    letter-spacing: 0.02em;
  }

  /* ── form ── */
  .lg-form {
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
    animation: lg-fadeUp 0.65s ease both 0.35s;
  }

  /* field */
  .lg-field {}
  .lg-label {
    display: block;
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 0.45rem;
  }
  .lg-input-wrap { position: relative; }
  .lg-input {
    width: 100%;
    padding: 0.72rem 1rem;
    border: 0.5px solid var(--border-gold);
    background: rgba(201,168,76,0.03);
    outline: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.85rem;
    font-weight: 300;
    color: var(--ink);
    letter-spacing: 0.02em;
    transition: border-color 0.25s, background 0.25s;
    box-sizing: border-box;
    border-radius: 0;
    -webkit-appearance: none;
  }
  .lg-input::placeholder {
    color: rgba(90,79,69,0.35);
    font-size: 0.78rem;
    letter-spacing: 0.04em;
  }
  .lg-input:focus {
    border-color: rgba(201,168,76,0.7);
    background: rgba(201,168,76,0.06);
  }
  .lg-input.has-icon { padding-right: 2.8rem; }
  .lg-input-icon-btn {
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    color: var(--ink-soft);
    display: flex;
    align-items: center;
    padding: 2px;
    transition: color 0.2s;
  }
  .lg-input-icon-btn:hover { color: var(--ink); }

  /* forgot */
  .lg-forgot {
    text-align: right;
    margin-top: -0.4rem;
  }
  .lg-forgot a {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 400;
    letter-spacing: 0.08em;
    color: var(--ink-soft);
    text-decoration: none;
    transition: color 0.22s;
  }
  .lg-forgot a:hover { color: var(--gold); }

  /* divider */
  .lg-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0.3rem 0 0.1rem;
  }
  .lg-divider-line {
    flex: 1; height: 0.5px;
    background: var(--border-gold);
  }
  .lg-divider-text {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(90,79,69,0.4);
  }

  /* submit btn */
  .lg-submit {
    width: 100%;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    background: var(--ink);
    border: 0.5px solid var(--ink);
    padding: 0.85rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    transition: background 0.3s, border-color 0.3s, color 0.3s, letter-spacing 0.25s;
    margin-top: 0.3rem;
  }
  .lg-submit:hover:not(:disabled) {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    letter-spacing: 0.27em;
  }
  .lg-submit:disabled {
    opacity: 0.55;
    cursor: not-allowed;
  }

  /* loading spinner */
  .lg-spinner {
    width: 14px; height: 14px;
    border: 1.5px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: lg-rotateSlow 0.7s linear infinite;
    position: relative;
    display: inline-block;
  }

  /* footer text */
  .lg-footer-text {
    text-align: center;
    margin-top: 1.6rem;
    font-family: 'Jost', sans-serif;
    font-size: 0.75rem;
    font-weight: 300;
    color: var(--ink-soft);
    letter-spacing: 0.02em;
    animation: lg-fadeUp 0.65s ease both 0.45s;
  }
  .lg-footer-text a {
    color: var(--ink);
    font-weight: 600;
    text-decoration: none;
    border-bottom: 0.5px solid var(--border-gold);
    padding-bottom: 1px;
    transition: color 0.22s, border-color 0.22s;
  }
  .lg-footer-text a:hover {
    color: var(--gold);
    border-color: var(--gold);
  }

  /* trust badges */
  .lg-trust {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.2rem;
    margin-top: 2rem;
    padding-top: 1.4rem;
    border-top: 0.5px solid var(--border-gold);
    animation: lg-fadeUp 0.65s ease both 0.5s;
  }
  .lg-trust-item {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    color: rgba(90,79,69,0.5);
    text-transform: uppercase;
  }
  .lg-trust-dot {
    width: 3px; height: 3px;
    border-radius: 50%;
    background: var(--gold);
    opacity: 0.6;
    flex-shrink: 0;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .lg-page { grid-template-columns: 1fr; }
    .lg-photo-panel { display: none; }
    .lg-form-panel { padding: 3rem 1.6rem 3.5rem; min-height: 100vh; }
    .lg-h1 { font-size: 1.9rem; }
  }
  @media (max-width: 420px) {
    .lg-form-panel { padding: 2.5rem 1.2rem 3rem; }
    .lg-logo { margin-bottom: 2.2rem; font-size: 1.7rem; }
    .lg-trust { gap: 0.8rem; flex-wrap: wrap; justify-content: center; }
  }
`;

/* ─── Spinner ── */
const Spinner = () => (
  <span
    style={{
      width: 14,
      height: 14,
      border: "1.5px solid rgba(255,255,255,0.3)",
      borderTopColor: "currentColor",
      borderRadius: "50%",
      display: "inline-block",
      animation: "lg-rotateSlow 0.7s linear infinite",
    }}
    aria-hidden="true"
  />
);

/* ─── Field wrapper ── */
function Field({ label, id, children }) {
  return (
    <div className="lg-field">
      <label className="lg-label" htmlFor={id}>
        {label}
      </label>
      {children}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────── */
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
    <>
      <Helmet>
        <title>Sign In — Lumière</title>
        <meta
          name="description"
          content="Sign in to your Lumière account to manage orders, save favourites and access exclusive offers."
        />
      </Helmet>

      <style>{LOGIN_STYLES}</style>

      <div className="lg-page">
        {/* ── LEFT: editorial photo panel ── */}
        <div className="lg-photo-panel" aria-hidden="true">
          <img
            src="https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=900&auto=format&fit=crop&q=75"
            alt=""
            width="900"
            height="1200"
            loading="eager"
            decoding="async"
          />
          <div className="lg-photo-quote">
            <div className="lg-photo-quote-line" />
            <p>"Crafted for those who notice the details."</p>
            <span>Lumière Fine Jewellery</span>
          </div>
        </div>

        {/* ── RIGHT: form panel ── */}
        <div className="lg-form-panel">
          <div className="lg-form-bg" aria-hidden="true" />
          <div className="lg-form-topline" aria-hidden="true" />

          <div className="lg-form-inner">
            {/* Logo */}
            <Link to="/" className="lg-logo" aria-label="Lumière – Home">
              <em>Lumière</em>
            </Link>

            {/* Heading */}
            <div className="lg-heading-block">
              <p className="lg-eyebrow">Member Access</p>
              <h1 className="lg-h1">
                Welcome <em>back</em>
              </h1>
              <p className="lg-sub">Sign in to your account to continue.</p>
            </div>

            {/* Form */}
            <form className="lg-form" onSubmit={onSubmit} noValidate>
              <Field label="Email Address" id="email">
                <div className="lg-input-wrap">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="lg-input"
                    value={form.email}
                    onChange={onChange}
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-required="true"
                  />
                </div>
              </Field>

              <Field label="Password" id="password">
                <div className="lg-input-wrap">
                  <input
                    id="password"
                    name="password"
                    type={show ? "text" : "password"}
                    className={`lg-input has-icon`}
                    value={form.password}
                    onChange={onChange}
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    aria-required="true"
                  />
                  <button
                    type="button"
                    className="lg-input-icon-btn"
                    onClick={() => setShow((s) => !s)}
                    aria-label={show ? "Hide password" : "Show password"}
                  >
                    {show ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </Field>

              {/* forgot password */}
              <div className="lg-forgot">
                <Link to="/forgot-password">Forgot password?</Link>
              </div>

              <button
                type="submit"
                className="lg-submit"
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <Spinner /> Signing in…
                  </>
                ) : (
                  <>
                    Sign In <ArrowRight size={13} />
                  </>
                )}
              </button>
            </form>

            {/* register link */}
            <p className="lg-footer-text">
              Don't have an account? <Link to="/register">Create one</Link>
            </p>

            {/* trust badges */}
            <div className="lg-trust" aria-label="Security assurances">
              <span className="lg-trust-item">
                <span className="lg-trust-dot" />
                Secure Login
              </span>
              <span className="lg-trust-item">
                <span className="lg-trust-dot" />
                SSL Encrypted
              </span>
              <span className="lg-trust-item">
                <span className="lg-trust-dot" />
                Privacy Protected
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
