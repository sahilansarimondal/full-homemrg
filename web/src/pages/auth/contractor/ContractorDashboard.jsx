// src/pages/dashboards/ContractorDashboard.jsx
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../../styles/Dashboard.css";

export default function ContractorDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Mock data
  const jobsToday = [
    {
      task: "🛠 AC Tune-Up",
      time: "10:00am",
      address: "123 Main St",
      status: "Scheduled",
    },
    {
      task: "🧽 Deep Cleaning",
      time: "2:00pm",
      address: "456 Oak Ave",
      status: "Scheduled",
    },
    {
      task: "🧰 Repair",
      time: "4:00pm",
      address: "789 Pine Rd",
      status: "Scheduled",
    },
  ];
  const notifications = [
    { icon: "📩", text: "New message from Manager" },
    { icon: "🔄", text: "Job assignment updated" },
    { icon: "⚠️", text: "Urgent request received" },
  ];
  const performance = { hours: 32, jobs: 8 };

  // Only show top 2 jobs and notifications for compactness
  const jobsToShow = jobsToday.slice(0, 2);
  const notificationsToShow = notifications.slice(0, 2);

  return (
    <div
      className="contractor-dashboard-2col"
      style={{
        maxWidth: 950,
        margin: "0 auto",
        padding: "1.2rem 0",
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "2.2fr 1fr",
        gap: "1.3rem",
      }}
    >
      {/* Left Column: Jobs + Notifications */}
      <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
        {/* Welcome */}
        <div
          className="tile welcome-tile"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            minHeight: 48,
            padding: "0.5rem 1rem",
            marginBottom: 0,
          }}
        >
          <span style={{ fontSize: "1.5rem", marginRight: 6 }}>👷‍♂️</span>
          <h1 style={{ fontSize: "1.05rem", margin: 0, fontWeight: 700 }}>
            Welcome, {user?.first_name || "Contractor"}
          </h1>
        </div>
        {/* Today's Jobs */}
        <div
          className="tile jobs-tile"
          style={{ padding: "0.7rem 1rem", minWidth: 220 }}
        >
          <h3
            style={{
              fontSize: "1rem",
              margin: 0,
              marginBottom: 4,
              color: "#1746a0",
            }}
          >
            Today's Jobs
          </h3>
          <div style={{ display: "flex", gap: 8, flexDirection: "column" }}>
            {jobsToShow.map((job, i) => (
              <div
                key={i}
                style={{
                  background: "#f7f9fb",
                  borderRadius: 8,
                  boxShadow: "0 1px 4px #2563eb11",
                  padding: "0.5rem 0.7rem",
                  minWidth: 150,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  border: "1px solid #e3e8f0",
                  fontSize: "0.93rem",
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.98rem",
                    color: "#1746a0",
                    marginBottom: 1,
                  }}
                >
                  {job.task}
                </div>
                <div style={{ fontSize: "0.93rem", color: "#222" }}>
                  {job.time}
                </div>
                <div style={{ fontSize: "0.91rem", color: "#64748b" }}>
                  {job.address}
                </div>
                <div
                  style={{
                    fontSize: "0.91rem",
                    color: "#2563eb",
                    fontWeight: 600,
                  }}
                >
                  {job.status}
                </div>
                <button
                  style={{
                    marginTop: 4,
                    background: "#22c55e",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "3px 0",
                    fontWeight: 600,
                    fontSize: "0.91rem",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/dashboard/tasks")}
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
          {jobsToday.length > 2 && (
            <div style={{ marginTop: 4, textAlign: "right" }}>
              <button
                onClick={() => navigate("/dashboard/tasks")}
                style={{
                  background: "none",
                  color: "#2563eb",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.93rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                View All Jobs
              </button>
            </div>
          )}
        </div>
        {/* Notifications */}
        <div
          className="tile notifications-tile"
          style={{ padding: "0.7rem 1rem", minWidth: 220 }}
        >
          <h3
            style={{
              fontSize: "1rem",
              margin: 0,
              marginBottom: 4,
              color: "#1746a0",
            }}
          >
            Recent Notifications
          </h3>
          <ul
            style={{
              margin: 0,
              padding: 0,
              listStyle: "none",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {notificationsToShow.map((n, i) => (
              <li
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  color: "#222",
                  fontSize: "0.93rem",
                }}
              >
                <span style={{ fontSize: "1em" }}>{n.icon}</span> {n.text}
              </li>
            ))}
          </ul>
          {notifications.length > 2 && (
            <div style={{ marginTop: 2, textAlign: "right" }}>
              <button
                onClick={() => navigate("/dashboard/notifications")}
                style={{
                  background: "none",
                  color: "#2563eb",
                  border: "none",
                  fontWeight: 600,
                  fontSize: "0.93rem",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                View All
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Right Column: Stats + Clock In/Out */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.1rem",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        {/* Performance Stats */}
        <div
          className="tile stats-tile"
          style={{
            padding: "0.7rem 1rem",
            width: "100%",
            display: "flex",
            flexDirection: "row",
            gap: 12,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            className="stat-card"
            style={{
              minWidth: 90,
              padding: "0.5rem 0.5rem",
              textAlign: "center",
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px #a5b4fc22",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "1rem", marginBottom: 1, color: "#2563eb" }}
            >
              {performance.hours}
            </div>
            <div
              style={{ fontSize: "0.89rem", color: "#1746a0", fontWeight: 600 }}
            >
              Hours This Week
            </div>
          </div>
          <div
            className="stat-card"
            style={{
              minWidth: 90,
              padding: "0.5rem 0.5rem",
              textAlign: "center",
              background: "#fff",
              borderRadius: 8,
              boxShadow: "0 2px 8px #a5b4fc22",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{ fontSize: "1rem", marginBottom: 1, color: "#2563eb" }}
            >
              {performance.jobs}
            </div>
            <div
              style={{ fontSize: "0.89rem", color: "#1746a0", fontWeight: 600 }}
            >
              Jobs Completed
            </div>
          </div>
        </div>
        {/* Clock In/Out */}
        <div
          className="tile clock-tile"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "1.1rem 0.5rem",
          }}
        >
          <button
            onClick={() => navigate("/dashboard/clock")}
            style={{
              background: "#2563eb",
              color: "#fff",
              border: "none",
              borderRadius: 8,
              padding: "10px 32px",
              fontWeight: 700,
              fontSize: "1.08rem",
              boxShadow: "0 2px 8px #2563eb22",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            Clock In / Out
          </button>
        </div>
      </div>
    </div>
  );
}
