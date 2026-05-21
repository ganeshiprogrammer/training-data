// src/components/RecentCustomers.jsx
function statusStyles(status) {
  if (status === "Active") {
    return { color: "#166534", background: "#dcfce7" };
  }
  if (status === "Pending") {
    return { color: "#92400e", background: "#fef3c7" };
  }
  return { color: "#6b7280", background: "#f3f4f6" };
}

export default function RecentCustomers({ customers }) {
  return (
    <div data-testid="recent-customers-widget">
      <ul
        data-testid="customer-list"
        style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {customers.map((customer) => {
          const badge = statusStyles(customer.status);
          return (
            <li
              key={customer.id}
              data-testid={`customer-item-${customer.id}`}
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
              <div
                data-testid={`customer-avatar-${customer.id}`}
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
                {customer.avatar}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <p
                  data-testid={`customer-name-${customer.id}`}
                  style={{ margin: 0, fontWeight: 600, fontSize: "14px", color: "#1a1d2e" }}
                >
                  {customer.name}
                </p>
                <p
                  data-testid={`customer-email-${customer.id}`}
                  style={{ margin: "2px 0 0", fontSize: "13px", color: "#6b7280" }}
                >
                  {customer.email}
                </p>
              </div>

              <span
                data-testid={`customer-status-${customer.id}`}
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  padding: "4px 10px",
                  borderRadius: "999px",
                  flexShrink: 0,
                  color: badge.color,
                  background: badge.background,
                }}
              >
                {customer.status}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
