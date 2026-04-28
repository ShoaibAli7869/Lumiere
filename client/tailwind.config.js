/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Primary brand — replaces Starbucks Green tiers
        brand: {
          DEFAULT: "#8B6914", // deep gold (= Starbucks Green role)
          accent: "#C9A84C", // CTA gold (= Green Accent role)
          dark: "#1C1610", // near-black warm (= House Green role)
          mid: "#3D2E0A", // mid dark (= Green Uplift role)
          light: "#F5EDD6", // pale gold wash (= Green Light role)
        },
        // Canvas — same warm neutral system
        canvas: { DEFAULT: "#FAF7F2", alt: "#F0EAE0" },
        card: "#FFFFFF",
        // Text
        ink: { DEFAULT: "rgba(0,0,0,0.87)", soft: "rgba(0,0,0,0.58)" },
        onDark: { DEFAULT: "#FFFFFF", soft: "rgba(255,255,255,0.70)" },
        // Semantic
        error: "#C82014",
        warning: "#FBBC05",
      },
      fontFamily: {
        // SoDoSans → Manrope (same confident, tight tracking feel)
        sans: ['"Manrope"', '"Helvetica Neue"', "Arial", "sans-serif"],
        // Lander Tall → Cormorant Garamond (jewelry editorial serif)
        serif: [
          '"Cormorant Garamond"',
          '"Iowan Old Style"',
          "Georgia",
          "serif",
        ],
      },
      letterSpacing: {
        brand: "-0.01em", // SoDoSans -0.16px equivalent
      },
      borderRadius: {
        pill: "50px", // universal pill button
        card: "12px", // card radius
      },
      boxShadow: {
        card: "0 0 0.5px rgba(0,0,0,0.14), 0 1px 1px rgba(0,0,0,0.24)",
        float: "0 0 6px rgba(0,0,0,0.24), 0 8px 12px rgba(0,0,0,0.14)",
        nav: "0 1px 3px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.06)",
      },
      spacing: {
        // rem-based scale anchored at 1.6rem = space-3
        "sp-1": "0.4rem",
        "sp-2": "0.8rem",
        "sp-3": "1.6rem",
        "sp-4": "3.2rem",
        "sp-5": "4.8rem",
        "sp-6": "6.4rem",
      },
    },
  },
  plugins: [],
};
