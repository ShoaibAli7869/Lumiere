import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, MessageCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

/* ─── Styles ─────────────────────────────────────────────── */
const CO_STYLES = `
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
    --card-bg:     #fffcf7;
  }

  @keyframes co-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes co-fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes co-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes co-spin {
    to { transform: rotate(360deg); }
  }

  /* ── page ── */
  .co-page { background: var(--cream); min-height: 100vh; }

  /* ── hero ── */
  .co-hero {
    background: var(--f-bg);
    padding: 3rem 5vw 2.8rem;
    position: relative;
    overflow: hidden;
  }
  .co-hero-glow {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 55% 80% at 50% 50%, rgba(201,168,76,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  .co-hero-line {
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), rgba(201,168,76,0.3), transparent);
  }
  .co-hero-inner {
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    text-align: center;
    animation: co-fadeUp 0.65s ease both 0.1s;
  }
  .co-hero-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.63rem;
    font-weight: 600;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.65rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
  }
  .co-hero-eyebrow::before,
  .co-hero-eyebrow::after {
    content: '';
    width: 24px; height: 0.5px;
    background: var(--border-gold);
    display: inline-block;
  }
  .co-hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3.2rem);
    font-weight: 300;
    color: var(--cream);
    margin: 0 0 0.4rem;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .co-hero-h1 em {
    font-style: italic; font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: co-shimmer 5s linear 1s infinite;
  }
  .co-hero-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 300;
    color: rgba(253,248,241,0.45);
    margin: 0;
    letter-spacing: 0.05em;
  }

  /* ── steps bar ── */
  .co-steps {
    background: var(--card-bg);
    border-bottom: 0.5px solid var(--border-gold);
    padding: 0.85rem 5vw;
  }
  .co-steps-inner {
    max-width: 1100px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
  }
  .co-step {
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--ink-soft);
    opacity: 0.4;
  }
  .co-step.active { opacity: 1; color: var(--ink); }
  .co-step.done   { opacity: 0.7; color: var(--gold); }
  .co-step-num {
    width: 20px; height: 20px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    display: flex; align-items: center; justify-content: center;
    font-size: 0.55rem; font-weight: 600;
    flex-shrink: 0;
  }
  .co-step.active .co-step-num {
    background: var(--ink);
    border-color: var(--ink);
    color: var(--cream);
  }
  .co-step.done .co-step-num {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
  }
  .co-step-line {
    width: 40px; height: 0.5px;
    background: var(--border-gold);
    margin: 0 0.6rem;
  }

  /* ── main grid ── */
  .co-main {
    max-width: 1100px;
    margin: 0 auto;
    padding: 2.5rem 5vw 5rem;
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 2rem;
    align-items: start;
  }

  /* ── shared card ── */
  .co-card {
    background: var(--card-bg);
    border: 0.5px solid var(--border-gold);
    padding: 1.8rem 2rem;
    animation: co-fadeUp 0.65s ease both;
  }
  .co-card-heading {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 1.4rem;
    padding-bottom: 0.8rem;
    border-bottom: 0.5px solid var(--border-gold);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .co-card-heading::after {
    content: '';
    flex: 1; height: 0.5px;
    background: var(--border-gold);
    max-width: 20px;
  }

  /* ── shipping form ── */
  .co-form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  .co-field { display: flex; flex-direction: column; }
  .co-field.span-2 { grid-column: span 2; }
  .co-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 0.42rem;
  }
  .co-input {
    width: 100%;
    padding: 0.68rem 0.95rem;
    border: 0.5px solid var(--border-gold);
    background: rgba(201,168,76,0.03);
    outline: none;
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    font-weight: 300;
    color: var(--ink);
    letter-spacing: 0.02em;
    transition: border-color 0.25s, background 0.25s;
    box-sizing: border-box;
    border-radius: 0;
    -webkit-appearance: none;
  }
  .co-input::placeholder { color: rgba(90,79,69,0.3); font-size: 0.75rem; }
  .co-input:focus {
    border-color: rgba(201,168,76,0.7);
    background: rgba(201,168,76,0.05);
  }

  /* whatsapp note */
  .co-wa-note {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    background: rgba(201,168,76,0.05);
    border: 0.5px solid var(--border-gold);
    padding: 0.9rem 1rem;
    margin: 1.6rem 0 0;
  }
  .co-wa-note-icon {
    color: var(--gold);
    flex-shrink: 0;
    margin-top: 1px;
  }
  .co-wa-note-text {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 300;
    color: var(--ink-soft);
    line-height: 1.65;
    margin: 0;
    letter-spacing: 0.01em;
  }
  .co-wa-note-text strong {
    font-weight: 600;
    color: var(--ink);
  }

  /* submit btn */
  .co-submit {
    width: 100%;
    font-family: 'Jost', sans-serif;
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    background: var(--ink);
    border: 0.5px solid var(--ink);
    padding: 0.92rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    margin-top: 1.5rem;
    transition: background 0.3s, border-color 0.3s, color 0.3s, letter-spacing 0.25s;
  }
  .co-submit:hover:not(:disabled) {
    background: #25a244;
    border-color: #25a244;
    color: #fff;
    letter-spacing: 0.27em;
  }
  .co-submit:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── order summary ── */
  .co-summary {
    position: sticky;
    top: calc(68px + 0.5rem);
    animation: co-fadeUp 0.7s ease both 0.15s;
  }
  .co-item-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 0.7rem 0;
    border-bottom: 0.5px solid rgba(201,168,76,0.1);
  }
  .co-item-row:last-of-type { border-bottom: none; }
  .co-item-img {
    width: 44px; height: 44px;
    flex-shrink: 0;
    background: var(--canvas-alt);
    overflow: hidden;
    border: 0.5px solid var(--border-gold);
  }
  .co-item-img img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .co-item-info { flex: 1; min-width: 0; }
  .co-item-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.92rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0 0 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .co-item-qty {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 400;
    color: var(--ink-soft);
    letter-spacing: 0.08em;
    margin: 0;
  }
  .co-item-price {
    font-family: 'Jost', sans-serif;
    font-size: 0.82rem;
    font-weight: 500;
    color: var(--ink);
    flex-shrink: 0;
    letter-spacing: 0.02em;
  }

  /* totals */
  .co-totals {
    border-top: 0.5px solid var(--border-gold);
    margin-top: 0.6rem;
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
  }
  .co-total-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
  }
  .co-total-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 300;
    color: var(--ink-soft);
    letter-spacing: 0.04em;
  }
  .co-total-val {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 400;
    color: var(--ink);
  }
  .co-total-val.free { color: #2a7a2a; font-weight: 500; }
  .co-grand-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding-top: 0.7rem;
    margin-top: 0.2rem;
    border-top: 0.5px solid var(--border-gold);
  }
  .co-grand-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ink);
  }
  .co-grand-val {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.55rem;
    font-weight: 300;
    color: var(--ink);
    letter-spacing: -0.01em;
  }

  /* trust row */
  .co-trust {
    display: flex;
    flex-direction: column;
    gap: 0.55rem;
    margin-top: 1.4rem;
    padding-top: 1.2rem;
    border-top: 0.5px solid var(--border-gold);
  }
  .co-trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 300;
    color: var(--ink-soft);
    letter-spacing: 0.03em;
  }
  .co-trust-item svg { color: var(--gold); flex-shrink: 0; }

  /* empty cart */
  .co-empty {
    grid-column: 1 / -1;
    text-align: center;
    padding: 5rem 0 4rem;
    animation: co-fadeUp 0.6s ease both;
  }
  .co-empty-icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.3rem;
    color: var(--gold);
  }
  .co-empty-h {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.7rem;
    font-weight: 300;
    font-style: italic;
    color: var(--ink);
    margin: 0 0 0.4rem;
  }
  .co-empty-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    color: var(--ink-soft);
    margin: 0 0 1.8rem;
  }
  .co-empty-btn {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--cream);
    background: var(--ink);
    border: 0.5px solid var(--ink);
    padding: 0.72rem 1.8rem;
    cursor: pointer;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s, border-color 0.3s, color 0.3s;
  }
  .co-empty-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 860px) {
    .co-main {
      grid-template-columns: 1fr;
      padding: 2rem 1.4rem 4rem;
    }
    .co-summary { position: static; }
    /* show summary first on mobile */
    .co-summary { order: -1; }
  }
  @media (max-width: 600px) {
    .co-hero { padding: 2.5rem 1.4rem 2.2rem; }
    .co-steps { padding: 0.75rem 1.4rem; }
    .co-step-line { width: 20px; }
    .co-main { padding: 1.5rem 1.1rem 3.5rem; gap: 1.4rem; }
    .co-card { padding: 1.4rem 1.2rem; }
    .co-form-grid { grid-template-columns: 1fr; }
    .co-field.span-2 { grid-column: span 1; }
  }
  @media (max-width: 380px) {
    .co-hero-h1 { font-size: 1.8rem; }
    .co-steps-inner { gap: 0; }
    .co-step { font-size: 0.55rem; gap: 5px; }
  }
`;

const FIELDS = [
  { name: "fullName", label: "Full Name",          span: true,  placeholder: "Jane Smith" },
  { name: "address",  label: "Street Address",     span: true,  placeholder: "123 Main Street" },
  { name: "city",     label: "City",               span: false, placeholder: "Lahore" },
  { name: "state",    label: "State / Province",   span: false, placeholder: "Punjab" },
  { name: "zip",      label: "ZIP / Postal Code",  span: false, placeholder: "54000" },
  { name: "country",  label: "Country",            span: false, placeholder: "Pakistan" },
];

const emptyAddress = {
  fullName: "", address: "", city: "", state: "", zip: "", country: "",
};

const fmt = (n) => `$${n.toFixed(2)}`;

export default function Checkout() {
  const [address, setAddress] = useState(emptyAddress);
  const [loading, setLoading] = useState(false);
  const { items, clearCart } = useCartStore();
  const navigate = useNavigate();

  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);

  const onChange = (e) =>
    setAddress((a) => ({ ...a, [e.target.name]: e.target.value }));

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      navigate("/shop");
      return;
    }
    const empty = Object.values(address).some((v) => !v.trim());
    if (empty) return toast.error("Please fill all shipping fields");

    setLoading(true);

    let msg = `*New Cash on Delivery Order* ✨\n\n`;
    msg += `*Customer Details*\n`;
    msg += `Name: ${address.fullName}\n`;
    msg += `Address: ${address.address}, ${address.city}, ${address.state} ${address.zip}, ${address.country}\n\n`;
    msg += `*Order Items*\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.name} × ${item.qty} — ${fmt(item.price * item.qty)}\n`;
      msg += `   ${window.location.origin}/product/${item._id}\n`;
    });
    msg += `\n*Subtotal:* ${fmt(subtotal)}\n`;
    msg += `*Shipping:* Free\n`;
    msg += `*Total:* ${fmt(subtotal)}\n\n`;
    msg += `Please confirm my order. Thank you!`;

    const url = `https://wa.me/923129805731?text=${encodeURIComponent(msg)}`;
    clearCart();
    window.location.href = url;
  };

  return (
    <>
      <Helmet>
        <title>Checkout — Lumière</title>
        <meta name="description" content="Complete your Lumière order via WhatsApp. Cash on delivery available." />
      </Helmet>

      <style>{CO_STYLES}</style>

      <div className="co-page">

        {/* ── Hero ── */}
        <div className="co-hero">
          <div className="co-hero-glow" aria-hidden="true" />
          <div className="co-hero-line"  aria-hidden="true" />
          <div className="co-hero-inner">
            <p className="co-hero-eyebrow">Lumière</p>
            <h1 className="co-hero-h1">Secure <em>Checkout</em></h1>
            <p className="co-hero-sub">Cash on Delivery · Confirmed via WhatsApp</p>
          </div>
        </div>

        {/* ── Steps ── */}
        <div className="co-steps" aria-label="Checkout steps">
          <div className="co-steps-inner">
            <div className="co-step done">
              <span className="co-step-num">✓</span>
              Cart
            </div>
            <div className="co-step-line" aria-hidden="true" />
            <div className="co-step active">
              <span className="co-step-num">2</span>
              Shipping
            </div>
            <div className="co-step-line" aria-hidden="true" />
            <div className="co-step">
              <span className="co-step-num">3</span>
              Confirm
            </div>
          </div>
        </div>

        {/* ── Main ── */}
        <div className="co-main">

          {items.length === 0 ? (
            <div className="co-empty">
              <div className="co-empty-icon" aria-hidden="true">
                <ShieldCheck size={22} />
              </div>
              <p className="co-empty-h">Your cart is empty</p>
              <p className="co-empty-sub">Add some pieces before checking out.</p>
              <Link to="/shop" className="co-empty-btn">
                Browse Collection <ArrowRight size={12} />
              </Link>
            </div>
          ) : (
            <>
              {/* ── LEFT: shipping form ── */}
              <div className="co-card" style={{ animationDelay: "0.2s" }}>
                <p className="co-card-heading">Shipping Address</p>

                <div className="co-form-grid">
                  {FIELDS.map((f) => (
                    <div key={f.name} className={`co-field${f.span ? " span-2" : ""}`}>
                      <label className="co-label" htmlFor={f.name}>{f.label}</label>
                      <input
                        id={f.name}
                        name={f.name}
                        value={address[f.name]}
                        onChange={onChange}
                        required
                        placeholder={f.placeholder}
                        className="co-input"
                        autoComplete={
                          f.name === "fullName" ? "name" :
                          f.name === "address"  ? "street-address" :
                          f.name === "city"     ? "address-level2" :
                          f.name === "state"    ? "address-level1" :
                          f.name === "zip"      ? "postal-code" :
                          f.name === "country"  ? "country-name" : "off"
                        }
                      />
                    </div>
                  ))}
                </div>

                {/* WhatsApp note */}
                <div className="co-wa-note" role="note">
                  <MessageCircle size={15} className="co-wa-note-icon" />
                  <p className="co-wa-note-text">
                    Your order will be sent via <strong>WhatsApp</strong>. Our team will
                    confirm availability and delivery timeline within a few hours.
                    <strong> Cash on Delivery</strong> — no payment needed upfront.
                  </p>
                </div>

                {/* Submit */}
                <button
                  className="co-submit"
                  onClick={handleWhatsAppCheckout}
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    "Preparing order…"
                  ) : (
                    <>
                      <MessageCircle size={14} />
                      Confirm Order via WhatsApp
                    </>
                  )}
                </button>
              </div>

              {/* ── RIGHT: order summary ── */}
              <div className="co-summary">
                <div className="co-card" style={{ animationDelay: "0.3s" }}>
                  <p className="co-card-heading">Order Summary</p>

                  {/* item list */}
                  <div role="list" aria-label="Cart items">
                    {items.map((item) => (
                      <div key={item._id} className="co-item-row" role="listitem">
                        <div className="co-item-img">
                          {item.img && (
                            <img src={item.img} alt={item.name} loading="lazy" decoding="async" />
                          )}
                        </div>
                        <div className="co-item-info">
                          <p className="co-item-name">{item.name}</p>
                          <p className="co-item-qty">Qty: {item.qty}</p>
                        </div>
                        <span className="co-item-price">
                          {fmt(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* totals */}
                  <div className="co-totals">
                    <div className="co-total-row">
                      <span className="co-total-label">Subtotal</span>
                      <span className="co-total-val">{fmt(subtotal)}</span>
                    </div>
                    <div className="co-total-row">
                      <span className="co-total-label">Shipping</span>
                      <span className="co-total-val free">Free</span>
                    </div>
                  </div>
                  <div className="co-grand-row">
                    <span className="co-grand-label">Total</span>
                    <span className="co-grand-val">{fmt(subtotal)}</span>
                  </div>

                  {/* trust */}
                  <div className="co-trust" aria-label="Order assurances">
                    <div className="co-trust-item">
                      <ShieldCheck size={13} />
                      Secure order — no card required
                    </div>
                    <div className="co-trust-item">
                      <Truck size={13} />
                      Free shipping on all orders
                    </div>
                    <div className="co-trust-item">
                      <MessageCircle size={13} />
                      Confirmed via WhatsApp within hours
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
