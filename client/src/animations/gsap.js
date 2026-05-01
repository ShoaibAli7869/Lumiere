import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// ─── Hero ────────────────────────────────────────────────────────────────────
// Call once on Hero mount. Targets must exist in DOM.
export function animateHero() {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  // Headline words slide up from below + fade
  tl.fromTo(
    ".hero-headline",
    { y: 48, opacity: 0 },
    { y: 0, opacity: 1, duration: 1 },
  )
    .fromTo(
      ".hero-sub",
      { y: 24, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5",
    )
    .fromTo(
      ".hero-cta",
      { y: 16, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7 },
      "-=0.4",
    )
    // Circular model photo pops in with a subtle scale
    .fromTo(
      ".hero-image",
      { scale: 0.88, opacity: 0, rotate: -3 },
      { scale: 1, opacity: 1, rotate: 0, duration: 1.1, ease: "expo.out" },
      "-=0.9",
    )
    // Decorative sparks/botanicals scatter in
    .fromTo(
      ".hero-accent",
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
      },
      "-=0.6",
    );

  return tl;
}

// ─── TrustBar ────────────────────────────────────────────────────────────────
export function animateTrustBar() {
  gsap.fromTo(
    ".trustbar-item",
    { y: 20, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      stagger: 0.12,
      scrollTrigger: {
        trigger: ".trustbar-item",
        start: "top 88%",
        toggleActions: "play none none none",
      },
    },
  );
}

// ─── Featured Products ────────────────────────────────────────────────────────
// Staggered card reveal as section scrolls into view
export function animateFeaturedProducts() {
  gsap.fromTo(
    ".featured-heading",
    { y: 32, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.9,
      scrollTrigger: {
        trigger: ".featured-heading",
        start: "top 85%",
      },
    },
  );

  gsap.fromTo(
    ".product-card-anim",
    { y: 56, opacity: 0, scale: 0.97 },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.75,
      stagger: 0.14,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".product-card-anim",
        start: "top 87%",
        toggleActions: "play none none none",
      },
    },
  );
}

// ─── Collection Grid ─────────────────────────────────────────────────────────
export function animateCollectionGrid() {
  gsap.fromTo(
    ".collection-cell",
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: { amount: 0.5, from: "start" },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".collection-cell",
        start: "top 86%",
      },
    },
  );
}

// ─── Lookbook Parallax ───────────────────────────────────────────────────────
// Photo moves slower than scroll = depth illusion
export function animateLookbook() {
  gsap.fromTo(
    ".lookbook-image",
    { yPercent: -8 },
    {
      yPercent: 8,
      ease: "none",
      scrollTrigger: {
        trigger: ".lookbook-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.4,
      },
    },
  );

  gsap.fromTo(
    ".lookbook-text",
    { x: 32, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".lookbook-section",
        start: "top 75%",
      },
    },
  );
}

// ─── Dark Band ───────────────────────────────────────────────────────────────
export function animateDarkBand() {
  gsap.fromTo(
    ".darkband-content",
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".darkband-content",
        start: "top 80%",
      },
    },
  );
}

// ─── Journal Cards ───────────────────────────────────────────────────────────
export function animateJournal() {
  gsap.fromTo(
    ".journal-card",
    { y: 44, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.7,
      stagger: 0.13,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".journal-card",
        start: "top 88%",
      },
    },
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
export function animateTestimonials() {
  gsap.fromTo(
    ".testimonials-section",
    { opacity: 0 },
    {
      opacity: 1,
      duration: 1.2,
      scrollTrigger: {
        trigger: ".testimonials-section",
        start: "top 82%",
      },
    },
  );
}

// ─── Instagram Grid ──────────────────────────────────────────────────────────
export function animateInstagram() {
  gsap.fromTo(
    ".insta-cell",
    { scale: 0.9, opacity: 0 },
    {
      scale: 1,
      opacity: 1,
      duration: 0.55,
      stagger: { amount: 0.4, from: "random" },
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".insta-cell",
        start: "top 88%",
      },
    },
  );
}

// ─── Cleanup helper ──────────────────────────────────────────────────────────
// Call in useEffect cleanup to kill ScrollTriggers tied to a component
export function killScrollTriggers(triggers = []) {
  triggers.forEach((t) => t?.kill());
  // Fallback: kill all if none specified (use carefully)
  if (!triggers.length) ScrollTrigger.getAll().forEach((t) => t.kill());
}

export { gsap, ScrollTrigger };
