export default function CheckoutSteps({ step }) {
  const steps = ["Shipping", "Review", "Payment"];
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0",
        marginBottom: "3rem",
      }}
    >
      {steps.map((s, i) => {
        const done = i < step;
        const current = i === step;
        return (
          <div key={s} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    done || current
                      ? "var(--color-cta-dark)"
                      : "rgba(0,0,0,0.1)",
                  color: done || current ? "#fff" : "var(--color-ink-soft)",
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  fontFamily: "var(--font-sans)",
                  transition: "background 0.3s",
                }}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.72rem",
                  fontWeight: current ? 700 : 400,
                  color: current ? "var(--color-ink)" : "var(--color-ink-soft)",
                }}
              >
                {s}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                style={{
                  width: "80px",
                  height: "1px",
                  background:
                    i < step ? "var(--color-cta-dark)" : "rgba(0,0,0,0.15)",
                  margin: "0 0.5rem 1.25rem",
                  transition: "background 0.3s",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
