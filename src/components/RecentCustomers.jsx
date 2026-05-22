// src/components/RecentCustomers.jsx
export default function RecentCustomers() {
  const customers = [
    { id: 1, name: "David Jones", email: "david.jones@example.com", status: "Active", initials: "DJ" },
    { id: 2, name: "Emma Watson", email: "emma.watson@example.com", status: "Active", initials: "EW" },
    { id: 3, name: "Frank Miller", email: "frank.miller@example.com", status: "Pending", initials: "FM" },
  ];

  const statusStyles = {
    Active: { background: "#d1fae5", color: "#065f46" },
    Pending: { background: "#fef3c7", color: "#92400e" },
  };

  return (
    <section data-testid="recent-customers-section">
      <h2
        data-testid="recent-customers-title"
        style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#1a1d2e" }}
      >
        Recent Customers
      </h2>

      <ul
        data-testid="rc-list"
        style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}
      >
        {customers.map((customer) => {
          const statusStyle = statusStyles[customer.status] || statusStyles.Pending;

          return (
            <li
              key={customer.id}
              data-testid={`rc-item-${customer.id}`}
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
                data-testid={`rc-avatar-${customer.id}`}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "#3b82f6",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "13px",
                  flexShrink: 0,
                }}
              >
                {customer.initials}
              </div>

              {/* Info */}
              <div style={{ flex: 1 }}>
                <div
                  data-testid={`rc-name-${customer.id}`}
                  style={{ fontWeight: 600, fontSize: "14px", color: "#1a1d2e" }}
                >
                  {customer.name}
                </div>
                <div
                  data-testid={`rc-email-${customer.id}`}
                  style={{ fontSize: "13px", color: "#6b7280", marginTop: "2px" }}
                >
                  {customer.email}
                </div>
              </div>

              {/* Status Badge */}
              <span
                data-testid={`rc-status-${customer.id}`}
                style={{
                  padding: "2px 10px",
                  borderRadius: "12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  flexShrink: 0,
                  ...statusStyle,
                }}
              >
                {customer.status}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
