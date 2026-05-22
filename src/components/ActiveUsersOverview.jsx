// src/components/ActiveUsersOverview.jsx
import activeUsersMetrics from "../mock/activeUsersMetrics";

export default function ActiveUsersOverview() {
  const peakUserCount = Math.max(...activeUsersMetrics.map((d) => d.userCount));
  const peakBlock = activeUsersMetrics.find((d) => d.userCount === peakUserCount);

  const trendStyles = {
    Peak: { color: "#4f46e5", background: "#eef2ff" },
    Upward: { color: "#6b7280", background: "#f3f4f6" },
    Downward: { color: "#6b7280", background: "#f3f4f6" },
    Stable: { color: "#6b7280", background: "#f3f4f6" },
  };

  return (
    <section
      data-testid="active-users-section"
      style={{
        background: "#fff",
        borderRadius: "12px",
        padding: "20px 24px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        border: "1px solid #f1f3f9",
        marginTop: "24px",
      }}
    >
      <h2
        data-testid="active-users-title"
        style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#1a1d2e" }}
      >
        Active Users Overview
      </h2>

      <p
        data-testid="active-users-peak"
        style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}
      >
        Peak traffic: {peakBlock.timeBlock} ({peakBlock.userCount.toLocaleString("en-US")} users)
      </p>

      <div>
        {activeUsersMetrics.map((entry, index) => {
          const isLast = index === activeUsersMetrics.length - 1;
          return (
            <div
              key={index}
              data-testid={`active-users-row-${index}`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: isLast ? "none" : "1px solid #f1f3f9",
              }}
            >
              <span
                data-testid={`active-users-block-${index}`}
                style={{ fontSize: "14px", fontWeight: 600, color: "#374151", flex: 1 }}
              >
                {entry.timeBlock}
              </span>

              <span
                data-testid={`active-users-count-${index}`}
                style={{
                  fontSize: "16px",
                  fontWeight: 700,
                  color: "#1a1d2e",
                  flex: 1,
                  textAlign: "center",
                }}
              >
                {entry.userCount.toLocaleString("en-US")}
              </span>

              <span
                data-testid={`active-users-trend-${index}`}
                style={{
                  padding: "2px 10px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  flexShrink: 0,
                  ...(trendStyles[entry.trend] || trendStyles.Stable),
                }}
              >
                {entry.trend}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
