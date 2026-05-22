// src/pages/About.jsx
import Sidebar from "../components/Sidebar";
import aboutData from "../mock/aboutData";

const { systemInfo, teamMembers } = aboutData;

export default function About() {
  return (
    <>
    <title>About</title>
    <div
      data-testid="about-page"
      style={{ display: "flex", minHeight: "100vh", background: "#f4f6fb" }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main style={{ flex: 1, padding: "32px 40px" }}>
        <h1
          style={{ margin: "0 0 8px", fontSize: "28px", fontWeight: 700, color: "#1a1d2e" }}
        >
          About
        </h1>
        <p style={{ margin: "0 0 32px", color: "#6b7280", fontSize: "14px" }}>
          Application overview and team information.
        </p>

        {/* System Info Card */}
        <section
          data-testid="about-system-card"
          style={{
            background: "#fff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginBottom: "32px",
          }}
        >
          <h2 style={{ margin: "0 0 20px", fontSize: "18px", fontWeight: 600, color: "#1a1d2e" }}>
            Application Overview
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: 600, color: "#374151", minWidth: "120px" }}>Application:</span>
              <span data-testid="about-system-name" style={{ color: "#6b7280" }}>{systemInfo.appName}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: 600, color: "#374151", minWidth: "120px" }}>Version:</span>
              <span data-testid="about-system-version" style={{ color: "#6b7280" }}>{systemInfo.version}</span>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <span style={{ fontWeight: 600, color: "#374151", minWidth: "120px" }}>Last Updated:</span>
              <span data-testid="about-system-updated" style={{ color: "#6b7280" }}>{systemInfo.lastUpdated}</span>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section
          data-testid="about-team-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {teamMembers.map((member, index) => (
            <div
              key={member.initials}
              data-testid={`about-team-card-${index + 1}`}
              style={{
                background: "#fff",
                borderRadius: "12px",
                padding: "24px",
                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                textAlign: "center",
              }}
            >
              <div
                data-testid={`about-team-initials-${index + 1}`}
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#4f46e5",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "16px",
                  margin: "0 auto 16px",
                }}
              >
                {member.initials}
              </div>
              <div
                data-testid={`about-team-name-${index + 1}`}
                style={{ fontWeight: 600, fontSize: "16px", color: "#1a1d2e", marginBottom: "4px" }}
              >
                {member.name}
              </div>
              <div
                data-testid={`about-team-role-${index + 1}`}
                style={{ fontSize: "13px", color: "#6b7280" }}
              >
                {member.role}
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
    </>
  );
}
