// src/components/RecentActivity.jsx
export default function RecentActivity({ activities }) {
  if (activities.length === 0) {
    return (
      <div
        data-testid="activity-empty"
        style={{
          textAlign: "center",
          padding: "40px",
          color: "#9ca3af",
          background: "#fff",
          borderRadius: "12px",
          border: "1px solid #f1f3f9",
        }}
      >
        No activities found.
      </div>
    );
  }

  return (
    <ul
      data-testid="activity-list"
      style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}
    >
      {activities.map((item) => (
        <li
          key={item.id}
          data-testid={`activity-item-${item.id}`}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            background: "#fff",
            borderRadius: "10px",
            padding: "14px 20px",
            border: "1px solid #f1f3f9",
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {/* Avatar */}
          <div
            data-testid={`activity-avatar-${item.id}`}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              background: "#4f46e5",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: "13px",
              flexShrink: 0,
            }}
          >
            {item.avatar}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <p
              data-testid={`activity-user-${item.id}`}
              style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: "#1a1d2e" }}
            >
              {item.user}
            </p>
            <p
              data-testid={`activity-action-${item.id}`}
              style={{ margin: "2px 0 0", fontSize: "13px", color: "#6b7280" }}
            >
              {item.action}
            </p>
          </div>

          {/* Time */}
          <span
            data-testid={`activity-time-${item.id}`}
            style={{ fontSize: "12px", color: "#9ca3af", flexShrink: 0 }}
          >
            {item.time}
          </span>
        </li>
      ))}
    </ul>
  );
}