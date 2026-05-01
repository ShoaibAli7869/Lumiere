import { useState } from "react";
import { Send, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FOOTER_LINKS = {
  Lumière: [
    { label: "Our Story", to: "/about" },
    { label: "Craftsmanship", to: "/craftsmanship" },
    { label: "Sustainability", to: "/sustainability" },
    { label: "Sitemap", to: "/sitemap" },
    { label: "Terms & Conditions", to: "/terms" },
    { label: "Privacy Policy", to: "/privacy" },
  ],
  "Customer Services": [
    { label: "Contact Us", to: "/contact" },
    { label: "Track Your Order", to: "/track" },
    { label: "Product Care & Repair", to: "/care" },
    { label: "Book an Appointment", to: "/appointment" },
    { label: "Frequently Asked Questions", to: "/faq" },
    { label: "Shipping & Returns", to: "/shipping" },
  ],
  "About Us": [
    { label: "Our Producers", to: "/producers" },
    { label: "Press", to: "/press" },
    { label: "Careers", to: "/careers" },
    { label: "Stockists", to: "/stockists" },
    { label: "Gift Cards", to: "/gift-cards" },
  ],
};

const PAYMENT_ICONS = [
  { id: "visa", label: "Visa" },
  { id: "mc", label: "Mastercard" },
  { id: "pp", label: "PayPal" },
  { id: "amex", label: "Amex" },
  { id: "gpay", label: "Google Pay" },
];

const SOCIALS = [];

const F_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap');

  :root {
    --ink:         #1a1612;
    --gold:        #C9A84C;
    --gold-light:  #e8d49a;
    --gold-dim:    rgba(201,168,76,0.18);
    --cream:       #fdf8f1;
    --border-gold: rgba(201,168,76,0.22);
    --f-bg:        #110f0c;
    --f-soft:      rgba(253,248,241,0.42);
    --f-softer:    rgba(253,248,241,0.22);
  }

  @keyframes f-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes f-lineGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
  @keyframes f-fadeUp {
    from { opacity: 0; transform: translateY(14px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .f-footer {
    background: var(--f-bg);
    color: var(--cream);
    padding: 0;
    position: relative;
    overflow: hidden;
  }

  /* ambient glow */
  .f-glow {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 50% 60% at 15% 0%,   rgba(201,168,76,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 35% 40% at 85% 100%, rgba(201,168,76,0.04) 0%, transparent 55%);
    pointer-events: none;
    z-index: 0;
  }

  /* ── top gold band ── */
  .f-top-band {
    height: 1.5px;
    background: linear-gradient(to right, transparent, var(--gold), rgba(201,168,76,0.3), transparent);
    transform-origin: left;
    animation: f-lineGrow 1s ease both;
  }

  /* ── brand strip ── */
  .f-brand-strip {
    border-bottom: 0.5px solid var(--border-gold);
    padding: 2.2rem 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .f-brand-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 300;
    letter-spacing: 0.12em;
    color: var(--cream);
    text-decoration: none;
    transition: color 0.25s;
    line-height: 1;
  }
  .f-brand-name em {
    font-style: italic;
    font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: f-shimmer 5s linear 1s infinite;
  }
  .f-brand-tagline {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 400;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--f-soft);
    margin: 0;
  }
  .f-socials {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }
  .f-social-btn {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    background: transparent;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--f-soft);
    text-decoration: none;
    transition: border-color 0.25s, background 0.25s, color 0.25s;
  }
  .f-social-btn:hover {
    border-color: var(--gold);
    background: rgba(201,168,76,0.12);
    color: var(--gold-light);
  }

  /* ── main grid ── */
  .f-main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 3.5rem 5vw 3rem;
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: 1.6fr repeat(3, 1fr);
    gap: 3rem;
  }

  /* newsletter col */
  .f-newsletter-heading {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.45rem;
    font-weight: 300;
    color: var(--cream);
    margin: 0 0 0.5rem;
    line-height: 1.2;
  }
  .f-newsletter-heading em { font-style: italic; font-weight: 400; color: var(--gold-light); }
  .f-newsletter-desc {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 300;
    color: var(--f-soft);
    line-height: 1.75;
    margin: 0 0 1.3rem;
  }
  .f-input-wrap {
    display: flex;
    border: 0.5px solid var(--border-gold);
    overflow: hidden;
    transition: border-color 0.25s;
  }
  .f-input-wrap:focus-within {
    border-color: rgba(201,168,76,0.6);
  }
  .f-email-input {
    flex: 1;
    background: rgba(255,255,255,0.04);
    border: none;
    outline: none;
    padding: 0.7rem 1rem;
    color: var(--cream);
    font-size: 0.78rem;
    font-family: 'Jost', sans-serif;
    font-weight: 300;
    letter-spacing: 0.03em;
  }
  .f-email-input::placeholder {
    color: var(--f-softer);
    font-size: 0.74rem;
    letter-spacing: 0.08em;
  }
  .f-send-btn {
    background: var(--gold);
    border: none;
    cursor: pointer;
    padding: 0 1rem;
    color: var(--ink);
    display: flex;
    align-items: center;
    transition: background 0.25s;
    flex-shrink: 0;
  }
  .f-send-btn:hover { background: var(--gold-light); }

  /* privacy note */
  .f-privacy-note {
    margin: 0.8rem 0 0;
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 300;
    color: var(--f-softer);
    letter-spacing: 0.05em;
    line-height: 1.5;
  }

  /* link columns */
  .f-col-heading {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 1.1rem;
    padding-bottom: 0.7rem;
    border-bottom: 0.5px solid var(--border-gold);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .f-col-heading::after {
    content: '';
    flex: 1;
    height: 0.5px;
    background: var(--border-gold);
    max-width: 20px;
  }
  .f-link {
    display: block;
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 300;
    color: var(--f-soft);
    text-decoration: none;
    margin-bottom: 0.55rem;
    letter-spacing: 0.02em;
    transition: color 0.22s, padding-left 0.22s;
  }
  .f-link:hover {
    color: var(--gold-light);
    padding-left: 5px;
  }

  /* ── bottom bar ── */
  .f-bottom {
    border-top: 0.5px solid var(--border-gold);
    padding: 1.3rem 5vw;
    position: relative;
    z-index: 1;
  }
  .f-bottom-inner {
    max-width: 1280px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .f-copyright {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 300;
    color: var(--f-softer);
    letter-spacing: 0.06em;
    margin: 0;
  }
  .f-payments {
    display: flex;
    align-items: center;
    gap: 6px;
  }
  .f-payment-chip {
    background: rgba(255,255,255,0.06);
    border: 0.5px solid rgba(201,168,76,0.15);
    border-radius: 3px;
    padding: 3px 8px;
    font-family: 'Jost', sans-serif;
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    color: rgba(253,248,241,0.45);
    text-transform: uppercase;
    transition: border-color 0.2s, color 0.2s;
  }
  .f-payment-chip:hover {
    border-color: rgba(201,168,76,0.4);
    color: rgba(253,248,241,0.7);
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 1024px) {
    .f-main { grid-template-columns: 1.4fr repeat(3, 1fr); gap: 2rem; }
  }
  @media (max-width: 800px) {
    .f-main {
      grid-template-columns: 1fr 1fr;
      gap: 2.2rem 2rem;
    }
    .f-newsletter-col { grid-column: 1 / -1; }
  }
  @media (max-width: 540px) {
    .f-brand-strip { padding: 1.8rem 1.4rem; }
    .f-main {
      grid-template-columns: 1fr 1fr;
      padding: 2.5rem 1.4rem 2.2rem;
      gap: 1.8rem 1.4rem;
    }
    .f-bottom { padding: 1.2rem 1.4rem; }
    .f-payments { flex-wrap: wrap; }
  }
  @media (max-width: 400px) {
    .f-main { grid-template-columns: 1fr; }
    .f-newsletter-col { grid-column: 1; }
  }
`;

export default function Footer() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <>
      <style>{F_STYLES}</style>
      <footer className="f-footer" role="contentinfo">
        <div className="f-glow" aria-hidden="true" />
        <div className="f-top-band" aria-hidden="true" />

        {/* ── brand strip ── */}
        <div className="f-brand-strip">
          <div>
            <Link to="/" className="f-brand-name">
              <em>Lumière</em>
            </Link>
            <p className="f-brand-tagline" style={{ marginTop: "0.35rem" }}>
              Fine Handcrafted Jewellery
            </p>
          </div>
          <div className="f-socials" aria-label="Social media links">
            {SOCIALS.map(({ Icon, label, to }) => (
              <a
                key={label}
                href={to}
                className="f-social-btn"
                aria-label={label}
              >
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>

        {/* ── main grid ── */}
        <div className="f-main">
          {/* Newsletter */}
          <div className="f-newsletter-col">
            <h3 className="f-newsletter-heading">
              Stay in the <em>Loop</em>
            </h3>
            <p className="f-newsletter-desc">
              Subscribe for new arrivals, exclusive offers, and the occasional
              behind-the-scenes glimpse into our craft.
            </p>

            {submitted ? (
              <p
                style={{
                  fontFamily: "'Jost', sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--gold-light)",
                  letterSpacing: "0.06em",
                  margin: 0,
                  padding: "0.7rem 0",
                }}
              >
                ✦ Thank you — you're on the list.
              </p>
            ) : (
              <form className="f-input-wrap" onSubmit={handleSubmit} noValidate>
                <input
                  type="email"
                  className="f-email-input"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-label="Email address for newsletter"
                  required
                />
                <button
                  type="submit"
                  className="f-send-btn"
                  aria-label="Subscribe"
                >
                  <Send size={14} />
                </button>
              </form>
            )}
            <p className="f-privacy-note">
              No spam, ever. Unsubscribe at any time. We respect your privacy.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <nav key={heading} aria-label={heading}>
              <p className="f-col-heading">{heading}</p>
              {links.map(({ label, to }) => (
                <Link key={label} to={to} className="f-link">
                  {label}
                </Link>
              ))}
            </nav>
          ))}
        </div>

        {/* ── bottom bar ── */}
        <div className="f-bottom">
          <div className="f-bottom-inner">
            <p className="f-copyright">
              © {new Date().getFullYear()} Lumière. All rights reserved.
            </p>
            <div className="f-payments" aria-label="Accepted payment methods">
              {PAYMENT_ICONS.map(({ id, label }) => (
                <span key={id} className="f-payment-chip" title={label}>
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
