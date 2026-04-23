// src/components/StatCard.jsx
export default function StatCard({ id, label, value, change, trend, icon }) {
  return (
    <div
      data-testid={`stat-card-${id}`}
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        border: "1px solid #f1f3f9",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p
            data-testid={`stat-label-${id}`}
            style={{ margin: 0, color: "#6b7280", fontSize: "13px", fontWeight: 500 }}
          >
            {label}
          </p>
          <p
            data-testid={`stat-value-${id}`}
            style={{ margin: "8px 0 0", fontSize: "26px", fontWeight: 700, color: "#1a1d2e" }}
          >
            {value}
          </p>
        </div>
        <span style={{ fontSize: "28px" }}>{icon}</span>
      </div>
      <p
        data-testid={`stat-change-${id}`}
        style={{
          margin: "12px 0 0",
          fontSize: "12px",
          fontWeight: 600,
          color: trend === "up" ? "#10b981" : "#ef4444",
        }}
      >
        {trend === "up" ? "▲" : "▼"} {change} vs last month
      </p>
    </div>
  );
}