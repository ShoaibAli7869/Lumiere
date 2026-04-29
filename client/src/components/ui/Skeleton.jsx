const pulse = {
  background: "linear-gradient(90deg, #f0ece6 25%, #e8e2d9 50%, #f0ece6 75%)",
  backgroundSize: "200% 100%",
  animation: "skeleton-shimmer 1.6s infinite",
};

// Inject keyframe once
if (
  typeof document !== "undefined" &&
  !document.getElementById("skeleton-style")
) {
  const s = document.createElement("style");
  s.id = "skeleton-style";
  s.textContent = `@keyframes skeleton-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`;
  document.head.appendChild(s);
}

export function Skeleton({
  width = "100%",
  height = 16,
  radius = 6,
  style = {},
}) {
  return (
    <div style={{ width, height, borderRadius: radius, ...pulse, ...style }} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div
      style={{
        borderRadius: 12,
        overflow: "hidden",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
      }}
    >
      <Skeleton height={280} radius={0} />
      <div style={{ padding: "16px" }}>
        <Skeleton height={13} width="60%" style={{ marginBottom: 8 }} />
        <Skeleton height={18} width="80%" style={{ marginBottom: 10 }} />
        <Skeleton height={13} width="35%" />
      </div>
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 48,
        maxWidth: 1100,
        margin: "60px auto",
        padding: "0 24px",
      }}
      className="md:grid-cols-2 grid-cols-1"
    >
      <Skeleton height={520} radius={12} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
          paddingTop: 16,
        }}
      >
        <Skeleton height={14} width="40%" />
        <Skeleton height={36} width="85%" />
        <Skeleton height={24} width="25%" />
        <Skeleton height={14} width="70%" />
        <Skeleton height={14} width="65%" />
        <Skeleton height={14} width="55%" />
        <div style={{ marginTop: 16 }}>
          <Skeleton height={48} radius={50} />
        </div>
      </div>
    </div>
  );
}

export function OrderRowSkeleton() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "18px 0",
        borderBottom: "1px solid rgba(0,0,0,0.06)",
      }}
    >
      <Skeleton height={14} width={80} />
      <Skeleton height={14} width={100} />
      <Skeleton height={14} width={60} style={{ marginLeft: "auto" }} />
      <Skeleton height={24} width={72} radius={50} />
    </div>
  );
}
