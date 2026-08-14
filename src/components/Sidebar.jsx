// src/components/Sidebar.jsx
import { Link } from "react-router-dom";

export default function Sidebar() {
  const navItems = [
    { label: "Dashboard", icon: "🏠", active: true, testId: "nav-dashboard" },
    { label: "Analytics", icon: "📊", active: false, testId: "nav-analytics" },
    { label: "Orders", icon: "📦", active: false, testId: "nav-orders" },
    { label: "Customers", icon: "👥", active: false, testId: "nav-customers" },
    { label: "Users", icon: "👤", active: false, testId: "nav-users" },
    { label: "Settings", icon: "⚙️", active: false, testId: "nav-settings" },
  ];

  return (
    <aside
      data-testid="sidebar"
      style={{
        width: "240px",
        background: "#1a1d2e",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        padding: "24px 0",
        minHeight: "100vh",
      }}
    >
      {/* Logo */}
      <div
        data-testid="sidebar-logo"
        style={{ padding: "0 24px 32px", fontSize: "20px", fontWeight: 700 }}
      >
        ⚡ AdminPro
      </div>

      {/* Nav */}
      <nav data-testid="sidebar-nav">
        {navItems.map((item) =>
          item.label === "Users" ? (
            <Link
              key={item.label}
              to="/users"
              data-testid={item.testId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 24px",
                color: item.active ? "#fff" : "#9ca3af",
                background: item.active ? "rgba(79,70,229,0.3)" : "transparent",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: item.active ? 600 : 400,
                borderLeft: item.active ? "3px solid #4f46e5" : "3px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          ) : (
            <a
              key={item.label}
              href="#"
              data-testid={item.testId}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 24px",
                color: item.active ? "#fff" : "#9ca3af",
                background: item.active ? "rgba(79,70,229,0.3)" : "transparent",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: item.active ? 600 : 400,
                borderLeft: item.active ? "3px solid #4f46e5" : "3px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <span>{item.icon}</span>
              {item.label}
            </a>
          )
        )}
      </nav>

      {/* User Info at Bottom */}
      <div
        data-testid="sidebar-user"
        style={{
          marginTop: "auto",
          padding: "16px 24px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <div
          style={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            background: "#4f46e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 700,
            fontSize: "14px",
          }}
        >
          JD
        </div>
        <div>
          <div style={{ fontWeight: 600, fontSize: "13px" }}>Jane Doe</div>
          <div style={{ color: "#9ca3af", fontSize: "11px" }}>Admin</div>
        </div>
      </div>
    </aside>
  );
}