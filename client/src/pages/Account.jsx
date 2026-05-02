import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  Package, User, Heart, ChevronRight,
  LogOut, ArrowRight, ShoppingBag, Eye, EyeOff,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";
import api from "../services/api";
import { OrderRowSkeleton } from "../components/ui/Skeleton";

/* ─── Styles ─────────────────────────────────────────────── */
const ACC_STYLES = `
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

  @keyframes ac-shimmer {
    0%   { background-position: -200% center; }
    100% { background-position:  200% center; }
  }
  @keyframes ac-fadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ac-fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes ac-spin {
    to { transform: rotate(360deg); }
  }
  @keyframes ac-pulse {
    0%, 100% { opacity: 0.4; }
    50%       { opacity: 0.9; }
  }

  /* ── page ── */
  .ac-page {
    background: var(--cream);
    min-height: 100vh;
  }

  /* ── hero banner ── */
  .ac-hero {
    background: var(--f-bg);
    padding: 3.2rem 5vw 3rem;
    position: relative;
    overflow: hidden;
  }
  .ac-hero-glow {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 55% 80% at 30% 50%, rgba(201,168,76,0.07) 0%, transparent 65%);
    pointer-events: none;
  }
  .ac-hero-line {
    position: absolute; top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(to right, transparent, var(--gold), rgba(201,168,76,0.3), transparent);
  }
  .ac-hero-inner {
    max-width: 1280px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
    animation: ac-fadeUp 0.65s ease both 0.1s;
  }
  .ac-hero-eyebrow {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.55rem;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ac-hero-eyebrow::after {
    content: '';
    display: inline-block;
    width: 24px; height: 0.5px;
    background: var(--border-gold);
  }
  .ac-hero-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 300;
    color: var(--cream);
    margin: 0;
    line-height: 1.05;
    letter-spacing: -0.01em;
  }
  .ac-hero-h1 em {
    font-style: italic; font-weight: 400;
    background: linear-gradient(90deg,#8B6914 0%,#C9A84C 40%,#e8d49a 60%,#C9A84C 80%,#8B6914 100%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: ac-shimmer 5s linear 1s infinite;
  }
  .ac-hero-meta {
    text-align: right;
  }
  .ac-hero-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 400;
    color: rgba(253,248,241,0.7);
    margin: 0 0 0.2rem;
    letter-spacing: 0.02em;
  }
  .ac-hero-email {
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 300;
    color: rgba(253,248,241,0.35);
    margin: 0;
    letter-spacing: 0.06em;
  }

  /* ── main layout ── */
  .ac-main {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2.5rem 5vw 5rem;
    display: grid;
    grid-template-columns: 220px 1fr;
    gap: 2.2rem;
    align-items: start;
  }

  /* ── sidebar ── */
  .ac-sidebar {
    position: sticky;
    top: calc(68px + 1rem);
    background: var(--card-bg);
    border: 0.5px solid var(--border-gold);
    overflow: hidden;
    animation: ac-fadeUp 0.65s ease both 0.2s;
  }

  /* user avatar block */
  .ac-sidebar-user {
    padding: 1.4rem 1.2rem 1rem;
    border-bottom: 0.5px solid var(--border-gold);
    background: rgba(201,168,76,0.03);
  }
  .ac-avatar {
    width: 44px; height: 44px;
    border-radius: 50%;
    border: 1px solid var(--border-gold);
    background: var(--canvas-alt);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.2rem;
    font-weight: 400;
    font-style: italic;
    color: var(--gold);
    margin-bottom: 0.7rem;
    flex-shrink: 0;
  }
  .ac-sidebar-uname {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0 0 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ac-sidebar-uemail {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 300;
    color: var(--ink-soft);
    margin: 0;
    letter-spacing: 0.04em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  /* nav items */
  .ac-nav { padding: 0.5rem 0; }
  .ac-nav-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.72rem 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.22s, padding-left 0.22s;
    position: relative;
  }
  .ac-nav-btn:hover { background: rgba(201,168,76,0.06); padding-left: 1.4rem; }
  .ac-nav-btn.active { background: rgba(201,168,76,0.1); }
  .ac-nav-btn.active::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 2px;
    background: var(--gold);
  }
  .ac-nav-left {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ac-nav-icon {
    width: 28px; height: 28px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    color: var(--ink-soft);
    transition: border-color 0.22s, color 0.22s, background 0.22s;
  }
  .ac-nav-btn.active .ac-nav-icon {
    border-color: var(--gold);
    color: var(--gold);
    background: rgba(201,168,76,0.08);
  }
  .ac-nav-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--ink-soft);
    transition: color 0.22s;
  }
  .ac-nav-btn.active .ac-nav-label { color: var(--ink); font-weight: 600; }
  .ac-nav-arrow {
    color: var(--ink-soft);
    opacity: 0;
    transform: translateX(-4px);
    transition: opacity 0.22s, transform 0.22s;
  }
  .ac-nav-btn:hover .ac-nav-arrow,
  .ac-nav-btn.active .ac-nav-arrow { opacity: 1; transform: translateX(0); }

  .ac-nav-divider {
    height: 0.5px;
    background: var(--border-gold);
    margin: 0.4rem 1.2rem;
  }
  .ac-logout-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 0.72rem 1.2rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #a03030;
    transition: background 0.22s, padding-left 0.22s;
    margin-bottom: 0.4rem;
  }
  .ac-logout-btn:hover {
    background: rgba(160,48,48,0.06);
    padding-left: 1.4rem;
  }

  /* mobile tab bar */
  .ac-mobile-tabs {
    display: none;
    overflow-x: auto;
    scrollbar-width: none;
    border-bottom: 0.5px solid var(--border-gold);
    background: var(--card-bg);
    padding: 0 1.1rem;
  }
  .ac-mobile-tabs::-webkit-scrollbar { display: none; }
  .ac-mobile-tab {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 0.75rem 1rem 0.7rem;
    background: none;
    border: none;
    cursor: pointer;
    font-family: 'Jost', sans-serif;
    font-size: 0.65rem;
    font-weight: 500;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--ink-soft);
    position: relative;
    white-space: nowrap;
    transition: color 0.22s;
  }
  .ac-mobile-tab::after {
    content: '';
    position: absolute;
    bottom: -0.5px; left: 0; right: 0;
    height: 1.5px;
    background: var(--gold);
    transform: scaleX(0);
    transform-origin: center;
    transition: transform 0.28s cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .ac-mobile-tab.active { color: var(--ink); }
  .ac-mobile-tab.active::after { transform: scaleX(1); }

  /* ── content panel ── */
  .ac-panel {
    background: var(--card-bg);
    border: 0.5px solid var(--border-gold);
    padding: 2rem 2.2rem;
    min-height: 420px;
    animation: ac-fadeIn 0.4s ease both;
  }
  .ac-panel-heading {
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
  .ac-panel-heading::after {
    content: '';
    flex: 1; height: 0.5px;
    background: var(--border-gold);
    max-width: 20px;
  }

  /* ── empty states ── */
  .ac-empty {
    text-align: center;
    padding: 4.5rem 0 3.5rem;
    animation: ac-fadeUp 0.6s ease both;
  }
  .ac-empty-icon {
    width: 52px; height: 52px;
    border-radius: 50%;
    border: 0.5px solid var(--border-gold);
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 1.3rem;
    color: var(--gold);
  }
  .ac-empty-h {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1.6rem;
    font-weight: 300;
    font-style: italic;
    color: var(--ink);
    margin: 0 0 0.4rem;
  }
  .ac-empty-sub {
    font-family: 'Jost', sans-serif;
    font-size: 0.78rem;
    font-weight: 300;
    color: var(--ink-soft);
    margin: 0 0 1.8rem;
    letter-spacing: 0.02em;
  }
  .ac-empty-btn {
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
  .ac-empty-btn:hover {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
  }

  /* ── orders table ── */
  .ac-orders-head {
    display: grid;
    grid-template-columns: 1.1fr 2fr 0.9fr 0.9fr 20px;
    gap: 12px;
    padding: 0 0 0.7rem;
    border-bottom: 0.5px solid var(--border-gold);
    margin-bottom: 0;
  }
  .ac-orders-head span {
    font-family: 'Jost', sans-serif;
    font-size: 0.58rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-soft);
    opacity: 0.6;
  }

  .ac-order-row {
    display: grid;
    grid-template-columns: 1.1fr 2fr 0.9fr 0.9fr 20px;
    gap: 12px;
    align-items: center;
    padding: 1rem 0;
    border-bottom: 0.5px solid rgba(201,168,76,0.1);
    text-decoration: none;
    transition: background 0.22s, padding-left 0.22s;
    cursor: pointer;
  }
  .ac-order-row:hover {
    background: rgba(201,168,76,0.04);
    padding-left: 6px;
  }

  .ac-order-id {
    font-family: 'Jost', sans-serif;
    font-size: 0.72rem;
    font-weight: 500;
    color: var(--ink);
    letter-spacing: 0.04em;
    margin: 0 0 2px;
  }
  .ac-order-date {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 300;
    color: var(--ink-soft);
    letter-spacing: 0.04em;
    margin: 0;
  }

  .ac-order-imgs {
    display: flex;
    gap: 5px;
    align-items: center;
  }
  .ac-order-img {
    width: 34px; height: 34px;
    background: var(--canvas-alt);
    overflow: hidden;
    flex-shrink: 0;
    border: 0.5px solid var(--border-gold);
  }
  .ac-order-img img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
  }
  .ac-order-more {
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    color: var(--ink-soft);
    font-weight: 300;
  }

  .ac-order-total {
    font-family: 'Cormorant Garamond', serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--ink);
  }

  /* status badge */
  .ac-badge {
    display: inline-block;
    font-family: 'Jost', sans-serif;
    font-size: 0.55rem;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    padding: 3px 8px;
    white-space: nowrap;
    border: 0.5px solid transparent;
  }

  /* ── profile form ── */
  .ac-profile { max-width: 420px; }
  .ac-section-label {
    font-family: 'Jost', sans-serif;
    font-size: 0.62rem;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin: 0 0 0.9rem;
    padding-bottom: 0.6rem;
    border-bottom: 0.5px solid var(--border-gold);
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .ac-section-label::after {
    content: '';
    flex: 1; height: 0.5px;
    background: var(--border-gold);
    max-width: 16px;
  }
  .ac-fields { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 1.8rem; }
  .ac-field {}
  .ac-field-label {
    display: block;
    font-family: 'Jost', sans-serif;
    font-size: 0.6rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 0.42rem;
  }
  .ac-input-wrap { position: relative; }
  .ac-input {
    width: 100%;
    padding: 0.68rem 1rem;
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
  }
  .ac-input::placeholder { color: rgba(90,79,69,0.3); font-size: 0.75rem; }
  .ac-input:focus {
    border-color: rgba(201,168,76,0.7);
    background: rgba(201,168,76,0.05);
  }
  .ac-input.has-icon { padding-right: 2.8rem; }
  .ac-eye-btn {
    position: absolute;
    right: 0.8rem; top: 50%;
    transform: translateY(-50%);
    background: none; border: none; cursor: pointer;
    color: var(--ink-soft);
    display: flex; align-items: center;
    transition: color 0.2s;
  }
  .ac-eye-btn:hover { color: var(--ink); }
  .ac-save-btn {
    font-family: 'Jost', sans-serif;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--cream);
    background: var(--ink);
    border: 0.5px solid var(--ink);
    padding: 0.78rem 2rem;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: background 0.3s, border-color 0.3s, color 0.3s, letter-spacing 0.25s;
  }
  .ac-save-btn:hover:not(:disabled) {
    background: var(--gold);
    border-color: var(--gold);
    color: var(--ink);
    letter-spacing: 0.27em;
  }
  .ac-save-btn:disabled { opacity: 0.5; cursor: not-allowed; }

  /* ── wishlist grid ── */
  .ac-wish-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 0.9rem;
  }
  .ac-wish-card {
    background: var(--cream);
    border: 0.5px solid var(--border-gold);
    overflow: hidden;
    position: relative;
    transition: border-color 0.3s, box-shadow 0.3s;
  }
  .ac-wish-card:hover {
    border-color: rgba(201,168,76,0.55);
    box-shadow: 0 8px 32px rgba(26,22,18,0.08);
  }
  .ac-wish-img-wrap {
    aspect-ratio: 1;
    overflow: hidden;
    background: var(--canvas-alt);
  }
  .ac-wish-img-wrap img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94);
    will-change: transform;
  }
  .ac-wish-card:hover .ac-wish-img-wrap img { transform: scale(1.06); }
  .ac-wish-remove {
    position: absolute;
    top: 8px; right: 8px;
    width: 28px; height: 28px;
    border-radius: 50%;
    background: rgba(253,248,241,0.92);
    border: 0.5px solid var(--border-gold);
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    color: #b04040;
    transition: background 0.2s;
  }
  .ac-wish-remove:hover { background: #b04040; color: #fff; }
  .ac-wish-body {
    padding: 0.75rem 0.85rem 0.8rem;
    border-top: 0.5px solid rgba(201,168,76,0.12);
  }
  .ac-wish-name {
    font-family: 'Cormorant Garamond', serif;
    font-size: 0.95rem;
    font-weight: 400;
    color: var(--ink);
    margin: 0 0 0.25rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-decoration: none;
    display: block;
    transition: color 0.22s;
  }
  .ac-wish-name:hover { color: var(--gold); }
  .ac-wish-price {
    font-family: 'Jost', sans-serif;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--ink-soft);
    margin: 0;
    letter-spacing: 0.03em;
  }

  /* skeleton pulse */
  .ac-skeleton {
    background: linear-gradient(90deg, var(--canvas-alt) 25%, rgba(243,237,227,0.5) 50%, var(--canvas-alt) 75%);
    background-size: 200% 100%;
    animation: ac-shimmer 1.4s ease infinite;
    border-radius: 2px;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 900px) {
    .ac-main {
      grid-template-columns: 1fr;
      padding: 0 0 3.5rem;
      gap: 0;
    }
    .ac-sidebar { display: none; }
    .ac-mobile-tabs { display: flex; position: sticky; top: 60px; z-index: 40; }
    .ac-panel {
      border-left: none; border-right: none; border-top: none;
      padding: 1.8rem 1.4rem;
      min-height: 320px;
    }
    .ac-hero { padding: 2.5rem 1.4rem 2.2rem; }
    .ac-hero-meta { display: none; }
    .ac-orders-head,
    .ac-order-row {
      grid-template-columns: 1fr 1.5fr 0.8fr 0.8fr 16px;
      gap: 8px;
    }
  }

  @media (max-width: 600px) {
    .ac-hero { padding: 2rem 1.1rem 1.8rem; }
    .ac-panel { padding: 1.4rem 1.1rem; }

    /* orders: hide items column */
    .ac-orders-head { grid-template-columns: 1fr 0.9fr 0.8fr 16px; }
    .ac-order-row   { grid-template-columns: 1fr 0.9fr 0.8fr 16px; }
    .ac-order-imgs  { display: none; }
    .ac-orders-head .col-items { display: none; }

    .ac-wish-grid { grid-template-columns: repeat(2, 1fr); gap: 0.65rem; }
    .ac-profile { max-width: 100%; }
  }

  @media (max-width: 380px) {
    .ac-wish-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── Helpers ─────────────────────────────────────────────── */
const fmt = (n) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);

const STATUS_STYLES = {
  pending:   { bg: "rgba(201,168,76,0.1)",  border: "rgba(201,168,76,0.4)",  text: "#8a5d0a" },
  paid:      { bg: "rgba(40,110,70,0.1)",   border: "rgba(40,110,70,0.35)",  text: "#226040" },
  shipped:   { bg: "rgba(50,100,200,0.1)",  border: "rgba(50,100,200,0.3)",  text: "#2a5aaa" },
  delivered: { bg: "rgba(26,22,18,0.07)",   border: "rgba(26,22,18,0.2)",    text: "#1a1612" },
  cancelled: { bg: "rgba(160,48,48,0.1)",   border: "rgba(160,48,48,0.35)", text: "#a03030" },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLES[status] || { bg: "rgba(0,0,0,0.05)", border: "transparent", text: "#888" };
  return (
    <span
      className="ac-badge"
      style={{ background: s.bg, borderColor: s.border, color: s.text }}
    >
      {status?.charAt(0).toUpperCase() + status?.slice(1)}
    </span>
  );
}

/* ─── Orders Tab ──────────────────────────────────────────── */
function OrdersTab() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/orders/my")
      .then((r) => setOrders(r.data.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>{[1,2,3].map((i) => <OrderRowSkeleton key={i} />)}</div>;

  if (orders.length === 0)
    return (
      <div className="ac-empty">
        <div className="ac-empty-icon"><Package size={20} /></div>
        <p className="ac-empty-h">No orders yet</p>
        <p className="ac-empty-sub">When you place an order it will appear here.</p>
        <Link to="/shop" className="ac-empty-btn">
          Start Shopping <ArrowRight size={12} />
        </Link>
      </div>
    );

  return (
    <div>
      <div className="ac-orders-head">
        <span>Order</span>
        <span className="col-items">Items</span>
        <span>Total</span>
        <span>Status</span>
        <span />
      </div>
      {orders.map((o) => (
        <Link
          key={o._id}
          to={`/account/orders/${o._id}`}
          className="ac-order-row"
        >
          <div>
            <p className="ac-order-id">#{o._id.slice(-6).toUpperCase()}</p>
            <p className="ac-order-date">
              {new Date(o.createdAt).toLocaleDateString("en-US", {
                month: "short", day: "numeric", year: "numeric",
              })}
            </p>
          </div>
          <div className="ac-order-imgs">
            {o.items?.slice(0, 3).map((item, i) => (
              <div key={i} className="ac-order-img">
                {item.image && <img src={item.image} alt="" loading="lazy" />}
              </div>
            ))}
            {(o.items?.length || 0) > 3 && (
              <span className="ac-order-more">+{o.items.length - 3}</span>
            )}
          </div>
          <p className="ac-order-total">{fmt(o.totalAmount)}</p>
          <StatusBadge status={o.orderStatus} />
          <ChevronRight size={13} style={{ color: "var(--gold)", opacity: 0.6 }} />
        </Link>
      ))}
    </div>
  );
}

/* ─── Profile Tab ─────────────────────────────────────────── */
function ProfileTab() {
  const { user, setUser } = useAuthStore();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });
  const [showCurr, setShowCurr] = useState(false);
  const [showNew,  setShowNew]  = useState(false);
  const [saving, setSaving] = useState(false);

  const onChange = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSave = async () => {
    if (!form.name.trim()) return toast.error("Name is required");
    setSaving(true);
    try {
      const payload = { name: form.name, email: form.email };
      if (form.newPassword) {
        if (!form.currentPassword) { toast.error("Enter your current password"); setSaving(false); return; }
        payload.currentPassword = form.currentPassword;
        payload.newPassword = form.newPassword;
      }
      const r = await api.patch("/auth/profile", payload);
      setUser(r.data);
      toast.success("Profile updated");
      setForm((f) => ({ ...f, currentPassword: "", newPassword: "" }));
    } catch (e) {
      toast.error(e.response?.data?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  const Field = ({ label, fieldKey, type = "text", placeholder, showToggle, show, onToggle }) => (
    <div className="ac-field">
      <label className="ac-field-label">{label}</label>
      <div className="ac-input-wrap">
        <input
          type={showToggle ? (show ? "text" : "password") : type}
          className={`ac-input${showToggle ? " has-icon" : ""}`}
          value={form[fieldKey]}
          placeholder={placeholder}
          onChange={onChange(fieldKey)}
          autoComplete={type === "email" ? "email" : type === "password" ? "current-password" : "off"}
        />
        {showToggle && (
          <button type="button" className="ac-eye-btn" onClick={onToggle} aria-label={show ? "Hide" : "Show"}>
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="ac-profile">
      {/* Personal info */}
      <p className="ac-section-label">Personal Info</p>
      <div className="ac-fields">
        <Field label="Full Name" fieldKey="name" placeholder="Your name" />
        <Field label="Email Address" fieldKey="email" type="email" placeholder="you@example.com" />
      </div>

      {/* Password */}
      <p className="ac-section-label" style={{ marginTop: "0.5rem" }}>Change Password</p>
      <div className="ac-fields">
        <Field
          label="Current Password" fieldKey="currentPassword" type="password"
          placeholder="Leave blank to keep current"
          showToggle show={showCurr} onToggle={() => setShowCurr((s) => !s)}
        />
        <Field
          label="New Password" fieldKey="newPassword" type="password"
          placeholder="Min 6 characters"
          showToggle show={showNew} onToggle={() => setShowNew((s) => !s)}
        />
      </div>

      <button className="ac-save-btn" onClick={handleSave} disabled={saving}>
        {saving ? "Saving…" : <><ArrowRight size={12} /> Save Changes</>}
      </button>
    </div>
  );
}

/* ─── Wishlist Tab ────────────────────────────────────────── */
function WishlistTab() {
  const { ids, toggle } = useWishlistStore();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length === 0) { setLoading(false); return; }
    api.get("/wishlist")
      .then((r) => setItems(r.data.wishlist || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [ids.length]);

  if (loading)
    return (
      <div className="ac-wish-grid">
        {[1,2,3,4].map((i) => (
          <div key={i} style={{ border: "0.5px solid var(--border-gold)" }}>
            <div className="ac-skeleton" style={{ aspectRatio: "1" }} />
            <div style={{ padding: "0.75rem" }}>
              <div className="ac-skeleton" style={{ height: 14, marginBottom: 6 }} />
              <div className="ac-skeleton" style={{ height: 12, width: "50%" }} />
            </div>
          </div>
        ))}
      </div>
    );

  if (ids.length === 0 || items.length === 0)
    return (
      <div className="ac-empty">
        <div className="ac-empty-icon"><Heart size={20} /></div>
        <p className="ac-empty-h">Your wishlist is empty</p>
        <p className="ac-empty-sub">Save pieces you love and find them here.</p>
        <Link to="/shop" className="ac-empty-btn">
          Browse Collection <ArrowRight size={12} />
        </Link>
      </div>
    );

  return (
    <div className="ac-wish-grid">
      {items.map((p) => (
        <article key={p._id} className="ac-wish-card">
          <Link to={`/product/${p._id}`} className="ac-wish-img-wrap" tabIndex={-1}>
            {p.images?.[0] && (
              <img src={p.images[0].url} alt={p.name} loading="lazy" decoding="async" />
            )}
          </Link>
          <button className="ac-wish-remove" onClick={() => toggle(p._id)} aria-label="Remove from wishlist">
            <Heart size={12} fill="currentColor" />
          </button>
          <div className="ac-wish-body">
            <Link to={`/product/${p._id}`} className="ac-wish-name">{p.name}</Link>
            <p className="ac-wish-price">{fmt(p.price)}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

/* ─── Main ────────────────────────────────────────────────── */
const TABS = [
  { key: "orders",   label: "Orders",   Icon: Package },
  { key: "profile",  label: "Profile",  Icon: User },
  { key: "wishlist", label: "Wishlist", Icon: Heart },
];

export default function Account() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [active, setActive] = useState("orders");

  const handleLogout = () => { logout(); navigate("/login"); };

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <>
      <Helmet>
        <title>My Account — Lumière</title>
        <meta name="description" content="Manage your Lumière account, orders, wishlist and profile settings." />
      </Helmet>

      <style>{ACC_STYLES}</style>

      <div className="ac-page">

        {/* ── Hero banner ── */}
        <div className="ac-hero">
          <div className="ac-hero-glow" aria-hidden="true" />
          <div className="ac-hero-line" aria-hidden="true" />
          <div className="ac-hero-inner">
            <div>
              <p className="ac-hero-eyebrow">Lumière</p>
              <h1 className="ac-hero-h1">My <em>Account</em></h1>
            </div>
            <div className="ac-hero-meta">
              <p className="ac-hero-name">{user?.name || "Welcome"}</p>
              <p className="ac-hero-email">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* ── Mobile tabs ── */}
        <div className="ac-mobile-tabs" role="tablist" aria-label="Account sections">
          {TABS.map(({ key, label, Icon }) => (
            <button
              key={key}
              className={`ac-mobile-tab${active === key ? " active" : ""}`}
              onClick={() => setActive(key)}
              role="tab"
              aria-selected={active === key}
            >
              <Icon size={12} />
              {label}
            </button>
          ))}
        </div>

        {/* ── Main layout ── */}
        <div className="ac-main">

          {/* Desktop sidebar */}
          <aside className="ac-sidebar" aria-label="Account navigation">
            {/* User block */}
            <div className="ac-sidebar-user">
              <div className="ac-avatar">{initials}</div>
              <p className="ac-sidebar-uname">{user?.name || "My Account"}</p>
              <p className="ac-sidebar-uemail">{user?.email}</p>
            </div>

            {/* Nav */}
            <nav className="ac-nav">
              {TABS.map(({ key, label, Icon }) => (
                <button
                  key={key}
                  className={`ac-nav-btn${active === key ? " active" : ""}`}
                  onClick={() => setActive(key)}
                  aria-current={active === key ? "page" : undefined}
                >
                  <span className="ac-nav-left">
                    <span className="ac-nav-icon"><Icon size={13} /></span>
                    <span className="ac-nav-label">{label}</span>
                  </span>
                  <ChevronRight size={12} className="ac-nav-arrow" aria-hidden="true" />
                </button>
              ))}
              <div className="ac-nav-divider" aria-hidden="true" />
              <button className="ac-logout-btn" onClick={handleLogout}>
                <LogOut size={13} />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Content panel */}
          <main className="ac-panel" aria-label={TABS.find((t) => t.key === active)?.label}>
            <p className="ac-panel-heading">
              {TABS.find((t) => t.key === active)?.label}
            </p>
            {active === "orders"   && <OrdersTab />}
            {active === "profile"  && <ProfileTab />}
            {active === "wishlist" && <WishlistTab />}
          </main>

        </div>
      </div>
    </>
  );
}
