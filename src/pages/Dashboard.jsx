// src/pages/Dashboard.jsx
// This is the Dashboard page that Playwright will automate.
// Notice: every interactive/important element has a `data-testid` attribute.
// This is the best practice for writing stable Playwright tests.

import { useState } from "react";
import Sidebar from "../components/Sidebar";
import StatCard from "../components/StateCard";
import RecentActivity from "../components/RecentActivity";
import RecentCustomers from "../components/RecentCustomers";
import ActiveUsersOverview from "../components/ActiveUsersOverview";

const stats = [
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$48,295",
    change: "+12.5%",
    trend: "up",
    icon: "💰",
  },
  {
    id: "users",
    label: "Active Users",
    value: "3,842",
    change: "+8.1%",
    trend: "up",
    icon: "👥",
  },
  {
    id: "orders",
    label: "New Orders",
    value: "1,204",
    change: "-3.2%",
    trend: "down",
    icon: "📦",
  },
  {
    id: "conversion",
    label: "Conversion Rate",
    value: "5.27%",
    change: "+1.4%",
    trend: "up",
    icon: "📈",
  },
];

const activities = [
  { id: 1, user: "Alice Johnson", action: "Placed a new order", time: "2 min ago", avatar: "AJ" },
  { id: 2, user: "Bob Smith", action: "Signed up as a new user", time: "15 min ago", avatar: "BS" },
  { id: 3, user: "Carol White", action: "Submitted a support ticket", time: "1 hr ago", avatar: "CW" },
  { id: 4, user: "David Lee", action: "Upgraded to Pro plan", time: "3 hr ago", avatar: "DL" },
  { id: 5, user: "Eva Martinez", action: "Cancelled subscription", time: "5 hr ago", avatar: "EM" },
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);

  const filteredActivities = activities.filter((a) =>
    a.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.action.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <title>Dashboard</title>
    <div
      data-testid="dashboard-page"
      style={{ display: "flex", minHeight: "100vh", background: "#f4f6fb" }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px 40px" }}>

        {/* Header */}
        <header
          data-testid="dashboard-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "32px",
          }}
        >
          <div>
            <h1
              data-testid="dashboard-title"
              style={{ margin: 0, fontSize: "28px", fontWeight: 700, color: "#1a1d2e" }}
            >
              Dashboard
            </h1>
            <p style={{ margin: "4px 0 0", color: "#6b7280", fontSize: "14px" }}>
              Welcome back! Here's what's happening.
            </p>
          </div>

          <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
            {/* Search Input */}
            <input
              data-testid="search-input"
              type="text"
              placeholder="Search activity..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                padding: "8px 16px",
                borderRadius: "8px",
                border: "1px solid #e5e7eb",
                fontSize: "14px",
                outline: "none",
                width: "220px",
                background: "#fff",
              }}
            />

            {/* Notification Bell */}
            <button
              data-testid="notification-bell"
              onClick={() => setNotifOpen(!notifOpen)}
              aria-label="Notifications"
              style={{
                background: notifOpen ? "#4f46e5" : "#fff",
                color: notifOpen ? "#fff" : "#374151",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
                padding: "8px 12px",
                cursor: "pointer",
                fontSize: "18px",
                position: "relative",
              }}
            >
              🔔
              {/* Notification badge */}
              <span
                data-testid="notification-badge"
                style={{
                  position: "absolute",
                  top: "-4px",
                  right: "-4px",
                  background: "#ef4444",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "11px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                3
              </span>
            </button>
          </div>
        </header>

        {/* Notification Dropdown */}
        {notifOpen && (
          <div
            data-testid="notification-dropdown"
            style={{
              background: "#fff",
              border: "1px solid #e5e7eb",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "24px",
              boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            }}
          >
            <p style={{ fontWeight: 600, marginBottom: "8px" }}>Notifications (3)</p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>🟢 Server health is normal</p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>📦 Order #1042 was shipped</p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>👤 New user registration spike</p>
          </div>
        )}

        {/* Stat Cards Grid */}
        <section
          data-testid="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
            marginBottom: "32px",
          }}
        >
          {stats.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </section>

        {/* Recent Activity */}
        <section data-testid="activity-section">
          <h2 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "#1a1d2e" }}>
            Recent Activity
          </h2>

          {searchQuery && (
            <p data-testid="search-results-count" style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
              Showing {filteredActivities.length} result(s) for "{searchQuery}"
            </p>
          )}

          <RecentActivity activities={filteredActivities} />
        </section>

        {/* Recent Customers */}
        <RecentCustomers />

        {/* Active Users Overview */}
        <ActiveUsersOverview />
      </main>
    </div>
    </>
  );
}