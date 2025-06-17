// src/pages/dashboards/ManagerDashboard.jsx
import React from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../../styles/Dashboard.css";

export default function ManagerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  // Mock data
  const stats = [
    { label: "Contractors", value: 5 },
    { label: "Homeowners", value: 12 },
    { label: "Applicants", value: 2 },
    { label: "Open Issues", value: 3 },
    { label: "Scheduled Jobs", value: 7 },
  ];
  const appointmentsToday = [
    {
      name: "Project Review",
      time: "11:00am",
      with: "Alex Contractor",
      icon: "📋",
      status: "upcoming",
    },
    {
      name: "Client Call",
      time: "3:00pm",
      with: "Pat Homeowner",
      icon: "📞",
      status: "upcoming",
    },
    {
      name: "Site Inspection",
      time: "9:30am",
      with: "Mike Builder",
      icon: "🔍",
      status: "completed",
    },
    {
      name: "Contract Signing",
      time: "2:00pm",
      with: "Sarah Owner",
      icon: "✍️",
      status: "upcoming",
    },
    {
      name: "Team Meeting",
      time: "10:00am",
      with: "Contractor Team",
      icon: "👥",
      status: "completed",
    },
    {
      name: "Budget Review",
      time: "1:00pm",
      with: "John Manager",
      icon: "💰",
      status: "upcoming",
    },
    {
      name: "Safety Training",
      time: "4:00pm",
      with: "Safety Team",
      icon: "🛡️",
      status: "upcoming",
    },
  ];

  return (
    <div>
      <div
        className="dashboard-tiles vertical"
        style={{
          gap: "1.2rem",
          maxWidth: 800,
          minHeight: "auto",
          padding: "1.2rem 0 1.2rem 0",
        }}
      >
        {/* Top Action Bar */}
        <div
          className="actions-tile"
          style={{
            justifyContent: "center",
            marginBottom: 0,
            marginTop: 0,
            gap: 8,
            background: "none",
            boxShadow: "none",
            padding: 0,
          }}
        >
          <button onClick={() => navigate("/dashboard/users")}>
            Manage Users
          </button>
          <button onClick={() => navigate("/dashboard/users?tab=applicants")}>
            Review Applicants
          </button>
          <button onClick={() => navigate("/dashboard/schedules")}>
            Assign Jobs
          </button>
          <button onClick={() => navigate("/dashboard/reports")}>
            View Reports
          </button>
        </div>
        {/* Welcome and Stats Row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            alignItems: "stretch",
            marginBottom: 0,
          }}
        >
          <div
            className="tile"
            style={{
              flex: 2,
              minWidth: 0,
              marginBottom: 0,
              padding: "1.2rem 1.5rem",
              background: "#fff",
              boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h1
              style={{
                fontSize: "1.7rem",
                margin: 0,
                fontWeight: 700,
                color: "#222",
              }}
            >
              Welcome, {user?.first_name || "Manager"}
            </h1>
          </div>
        </div>
        {/* Stat Boxes Row */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 0,
            justifyContent: "center",
            alignItems: "stretch",
          }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="stat-card"
              style={{
                minWidth: 110,
                padding: "1.1rem 1.1rem",
                textAlign: "center",
                background: "#fff",
                borderRadius: 10,
                boxShadow: "0 2px 8px #a5b4fc22",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className="stat-num"
                style={{ fontSize: "1.45rem", marginBottom: 2 }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontSize: "0.98rem",
                  color: "#1746a0",
                  fontWeight: 600,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
        {/* Appointments Today */}
        <div
          className="tile"
          style={{
            marginBottom: 0,
            padding: "1.5rem",
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 4px 18px rgba(0,0,0,0.07)",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              margin: 0,
              marginBottom: "1.2rem",
              color: "#1746a0",
              fontWeight: 600,
            }}
          >
            Appointments Today
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1rem",
              maxWidth: "100%",
            }}
          >
            {appointmentsToday.slice(0, 8).map((appointment, index) => (
              <div
                key={index}
                style={{
                  background:
                    appointment.status === "completed" ? "#f8fafc" : "#fff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 8,
                  padding: "1rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  position: "relative",
                  transition: "transform 0.2s, box-shadow 0.2s",
                  cursor: "pointer",
                  ":hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span style={{ fontSize: "1.2em" }}>{appointment.icon}</span>
                  <span
                    style={{
                      fontSize: "0.9rem",
                      fontWeight: 600,
                      color: "#1746a0",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {appointment.name}
                  </span>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <span style={{ color: "#94a3b8" }}>🕒</span>
                    <span>{appointment.time}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <span style={{ color: "#94a3b8" }}>👤</span>
                    <span>{appointment.with}</span>
                  </div>
                </div>
                {appointment.status === "completed" && (
                  <div
                    style={{
                      position: "absolute",
                      top: "0.5rem",
                      right: "0.5rem",
                      background: "#e2e8f0",
                      color: "#64748b",
                      fontSize: "0.75rem",
                      padding: "0.25rem 0.5rem",
                      borderRadius: 4,
                      fontWeight: 500,
                    }}
                  >
                    Completed
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
