// src/pages/dashboards/HomeownerDashboard.jsx
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  FaExclamationCircle,
  FaEnvelope,
  FaTools,
  FaUserCircle,
  FaCalendarAlt,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaWrench,
  FaWindowRestore,
} from "react-icons/fa";
import "../../../styles/Dashboard.css";

const URGENT_SERVICES = ["Plumbing", "Electrical", "HVAC", "Lockout", "Other"];

function UrgentRequestModal({ open, onClose, onSubmit }) {
  const [service, setService] = useState("");
  const [desc, setDesc] = useState("");
  const [time, setTime] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    onSubmit({ service, desc, time });
    setTimeout(() => {
      setSubmitted(false);
      setService("");
      setDesc("");
      setTime("");
      onClose();
    }, 1200);
  };
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.18)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: 10,
          padding: 32,
          minWidth: 340,
          boxShadow: "0 4px 24px #0002",
          position: "relative",
        }}
      >
        <h2
          style={{
            fontSize: "1.15rem",
            fontWeight: 700,
            marginBottom: 18,
            color: "#1746a0",
          }}
        >
          Urgent Request
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          <label style={{ fontWeight: 600, color: "#1746a0" }}>
            Service Needed
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              required
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1.5px solid #e3e8f0",
                marginTop: 4,
              }}
            >
              <option value="">Select...</option>
              {URGENT_SERVICES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
          <label style={{ fontWeight: 600, color: "#1746a0" }}>
            Description / Details
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              rows={3}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1.5px solid #e3e8f0",
                marginTop: 4,
                resize: "vertical",
              }}
            />
          </label>
          <label style={{ fontWeight: 600, color: "#1746a0" }}>
            Preferred Time (optional)
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. Today after 5pm"
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1.5px solid #e3e8f0",
                marginTop: 4,
              }}
            />
          </label>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 10,
              marginTop: 8,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                background: "#e5e7eb",
                color: "#222",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontWeight: 600,
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontWeight: 600,
              }}
            >
              Submit
            </button>
          </div>
          {submitted && (
            <div
              style={{ color: "#22c55e", marginTop: 8, textAlign: "center" }}
            >
              Request submitted!
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function HomeownerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [urgentOpen, setUrgentOpen] = useState(false);
  // Mock data
  const services = [
    {
      name: "Lawn Mowing",
      date: "Wed @ 9am",
      contractor: "Alex Contractor",
      icon: <FaTools color="#22c55e" />,
    },
    {
      name: "HVAC Check",
      date: "Fri @ 1pm",
      contractor: "Jamie Builder",
      icon: <FaWrench color="#2563eb" />,
    },
    {
      name: "Window Cleaning",
      date: "Mon @ 2pm",
      contractor: "Taylor Smith",
      icon: <FaWindowRestore color="#f59e42" />,
    },
  ];
  const issues = [
    {
      title: "Leaky faucet",
      status: "Open",
      icon: <FaWrench color="#b91c1c" />,
      color: "#b91c1c",
    },
    {
      title: "Broken window",
      status: "In Progress",
      icon: <FaWindowRestore color="#f59e42" />,
      color: "#f59e42",
    },
  ];
  const account = { payment: "Current", nextInvoice: "06/01/2025" };

  const handleUrgentSubmit = (data) => {
    // TODO: send to backend or notifications
    // For now, just show confirmation
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e3e8f0 0%, #2563eb0d 100%)",
        padding: "2.5rem 0",
      }}
    >
      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 18, marginBottom: 32 }}>
        <button
          onClick={() => setUrgentOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: "1.08rem",
            boxShadow: "0 2px 8px #2563eb22",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <FaExclamationCircle /> Urgent Request
        </button>
        <button
          onClick={() => navigate("/dashboard/tasks")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#22c55e",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: "1.08rem",
            boxShadow: "0 2px 8px #22c55e22",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <FaTools /> Manage Services
        </button>
        <button
          onClick={() => navigate("/dashboard/issues")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#f59e42",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: "1.08rem",
            boxShadow: "0 2px 8px #f59e4222",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <FaTools /> Report an Issue
        </button>
        <button
          onClick={() => navigate("/dashboard/inbox")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            background: "#1746a0",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "14px 32px",
            fontWeight: 700,
            fontSize: "1.08rem",
            boxShadow: "0 2px 8px #1746a022",
            cursor: "pointer",
            transition: "background 0.15s",
          }}
        >
          <FaEnvelope /> Message Manager
        </button>
      </div>
      <UrgentRequestModal
        open={urgentOpen}
        onClose={() => setUrgentOpen(false)}
        onSubmit={handleUrgentSubmit}
      />
      {/* Welcome and Account/Next Appointment Row */}
      <div
        style={{
          display: "flex",
          gap: 24,
          alignItems: "stretch",
          marginBottom: 0,
          width: "100%",
          maxWidth: 900,
        }}
      >
        <div
          className="tile welcome-tile"
          style={{
            flex: 2,
            minWidth: 0,
            marginBottom: 0,
            padding: "1.7rem 1.7rem",
            background: "linear-gradient(135deg, #e0e7ff 0%, #fff 100%)",
            borderRadius: 18,
            boxShadow: "0 2px 12px #2563eb11",
            display: "flex",
            alignItems: "center",
            gap: 18,
          }}
        >
          <FaUserCircle size={54} color="#2563eb" style={{ flexShrink: 0 }} />
          <div>
            <h1
              style={{
                fontSize: "1.7rem",
                margin: 0,
                fontWeight: 800,
                color: "#1746a0",
              }}
            >
              Welcome, {user?.first_name || "Homeowner"}
            </h1>
            <div
              style={{ fontSize: "1.08rem", color: "#64748b", marginTop: 4 }}
            >
              Here's your home at a glance.
            </div>
          </div>
        </div>
        <div
          className="tile account-tile"
          style={{
            flex: 1,
            minWidth: 0,
            marginBottom: 0,
            padding: "1.7rem 1.2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            background: "#fff",
            borderRadius: 18,
            boxShadow: "0 2px 12px #2563eb11",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: "1.05rem",
              marginBottom: 2,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FaCheckCircle color="#22c55e" /> Account
          </div>
          <div
            style={{
              fontSize: "0.98rem",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            Payment:{" "}
            <b style={{ color: "#22c55e", marginLeft: 4 }}>{account.payment}</b>
          </div>
          <div
            style={{
              fontSize: "0.98rem",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <FaCalendarAlt color="#2563eb" /> Next Invoice:{" "}
            <b>{account.nextInvoice}</b>
          </div>
        </div>
      </div>
      {/* Upcoming Services as Tiles */}
      <div
        style={{
          display: "flex",
          gap: 24,
          marginBottom: 0,
          justifyContent: "flex-start",
          width: "100%",
          maxWidth: 900,
          marginTop: 28,
        }}
      >
        {services.slice(0, 3).map((s, i) => (
          <div
            key={i}
            className="tile services-tile"
            style={{
              flex: 1,
              minWidth: 0,
              padding: "1.3rem 1.1rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              height: 120,
              maxWidth: 180,
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 8px #2563eb11",
              gap: 6,
            }}
          >
            <div
              style={{
                fontWeight: 700,
                fontSize: "1.13rem",
                color: "#1746a0",
                marginBottom: 4,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              {s.icon} {s.name}
            </div>
            <div
              style={{
                fontSize: "1.01rem",
                marginBottom: 2,
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <FaClock /> {s.date}
            </div>
            <div style={{ color: "#64748b", fontSize: "0.98rem" }}>
              {s.contractor}
            </div>
          </div>
        ))}
      </div>
      {/* Pending Completion (was Open Issues) */}
      <div
        className="tile issues-tile"
        style={{
          marginBottom: 0,
          padding: "1.3rem 1.7rem",
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px #2563eb11",
          width: "100%",
          maxWidth: 900,
          marginTop: 32,
        }}
      >
        <h3
          style={{
            fontSize: "1.13rem",
            margin: 0,
            marginBottom: 10,
            fontWeight: 800,
            color: "#1746a0",
          }}
        >
          Pending Completion
        </h3>
        <ul
          style={{
            margin: 0,
            paddingLeft: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {issues.map((iss, i) => (
            <li
              key={i}
              style={{
                marginBottom: 2,
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              {iss.icon}
              <b>{iss.title}</b>
              <span
                style={{
                  background: iss.color + "22",
                  color: iss.color,
                  borderRadius: 8,
                  padding: "2px 12px",
                  fontWeight: 600,
                  fontSize: "0.98rem",
                  marginLeft: 8,
                }}
              >
                {iss.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
