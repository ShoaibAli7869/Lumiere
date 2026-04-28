import { Truck, RefreshCw, Shield, Headphones } from "lucide-react";

const items = [
  { icon: Truck, label: "Free Shipping" },
  { icon: RefreshCw, label: "30 Days Returns" },
  { icon: Shield, label: "Secured Payment" },
  { icon: Headphones, label: "Support 24/7" },
];

export default function TrustBar() {
  return (
    <div
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "#fff",
        padding: "1rem 2rem",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-around",
          flexWrap: "wrap",
          gap: "1rem",
        }}
      >
        {items.map(({ icon: Icon, label }) => (
          <div
            key={label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              fontFamily: "var(--font-sans)",
              fontSize: "0.82rem",
              color: "var(--color-ink-soft)",
              fontWeight: 500,
            }}
          >
            <Icon size={16} color="var(--color-cta-dark)" />
            {label}
          </div>
        ))}
      </div>
    </div>
  );
}
