// src/pages/TasksPage.jsx
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/SharedStyles.css";
import servicesCatalog from "../../data/serviceCatalog.json";

const FREQUENCIES = [
  "Daily",
  "Weekly",
  "Biweekly",
  "Monthly",
  "Quarterly",
  "Annually",
  "One-time",
];

// Mock descriptions and time estimates for demonstration
const serviceDetails = {
  "Laundry Service (wash, dry, fold, iron)": {
    description:
      "Complete laundry service including washing, drying, folding, and ironing.",
    time: 60,
  },
  "Kitchen & Appliance Wipe-Down": {
    description:
      "Wipe down all kitchen surfaces and appliances for a clean, sanitized space.",
    time: 20,
  },
  "Grocery Shopping & Delivery (based on meal plan)": {
    description:
      "Shop for groceries based on your meal plan and deliver them to your home.",
    time: 90,
  },
  "Closet Organization & Seasonal Swap": {
    description: "Organize closets and swap out seasonal clothing and items.",
    time: 120,
  },
  "Appointment Booking": {
    description: "Book and manage appointments for you and your household.",
    time: 15,
  },
  "Bill & Subscription Reminders": {
    description:
      "Reminders for bills and subscriptions to help you stay on track.",
    time: 10,
  },
  "Party & Gathering Planning": {
    description:
      "Plan and coordinate parties or gatherings, including logistics and invitations.",
    time: 180,
  },
  // ...add more as needed
};

function DescriptionModal({ open, onClose, service }) {
  if (!open || !service) return null;
  const details = serviceDetails[service] || {};
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
          minWidth: 320,
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
          {service}
        </h2>
        <div style={{ marginBottom: 18 }}>
          {details.description || "No description available."}
        </div>
        <div style={{ color: "#64748b", marginBottom: 18 }}>
          Estimated Time: <b>{details.time ? `${details.time} min` : "N/A"}</b>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
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
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function FrequencyModal({ open, onClose, service, value, onSave }) {
  if (!open) return null;
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
          minWidth: 320,
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
          Customize Frequency
        </h2>
        <div style={{ marginBottom: 18, fontWeight: 600 }}>{service}</div>
        <select
          value={value}
          onChange={(e) => onSave(e.target.value)}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: "1.5px solid #e3e8f0",
            fontSize: "1rem",
            marginBottom: 18,
          }}
        >
          <option value="">Select frequency...</option>
          {FREQUENCIES.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
          <button
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
        </div>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const { user } = useAuth();
  const [selected, setSelected] = useState({});
  const [frequencies, setFrequencies] = useState({});
  const [modalService, setModalService] = useState(null);
  const [descModalService, setDescModalService] = useState(null);
  const [saved, setSaved] = useState(false);

  console.log("TasksPage user:", user);

  // Step 1: Service selection
  const handleToggle = (service) => {
    setSelected((prev) => ({ ...prev, [service]: !prev[service] }));
    setSaved(false);
  };

  // Step 2: Save selections and show only selected services
  const handleSave = () => {
    // Save to localStorage based on user role
    const userTasks = {
      ...JSON.parse(localStorage.getItem(`hm_tasks_${user.role}`) || "{}"),
      [user.email]: {
        selected,
        frequencies,
      },
    };
    localStorage.setItem(`hm_tasks_${user.role}`, JSON.stringify(userTasks));
    setSaved(true);
  };

  // Load saved tasks on component mount
  React.useEffect(() => {
    if (user) {
      const savedTasks = JSON.parse(
        localStorage.getItem(`hm_tasks_${user.role}`) || "{}"
      );
      const userTasks = savedTasks[user.email];
      if (userTasks) {
        setSelected(userTasks.selected || {});
        setFrequencies(userTasks.frequencies || {});
        setSaved(true);
      }
    }
  }, [user]);

  const openModal = (service) => setModalService(service);
  const closeModal = () => setModalService(null);
  const handleFrequencySave = (freq) => {
    setFrequencies((prev) => ({ ...prev, [modalService]: freq }));
    closeModal();
  };
  const openDescModal = (service) => setDescModalService(service);
  const closeDescModal = () => setDescModalService(null);

  // Get all selected services as a flat array
  const selectedServices = Object.keys(selected).filter((s) => selected[s]);

  return (
    <div
      style={{
        maxWidth: 900,
        margin: "0 auto",
        padding: "0.5rem 0 3.5rem 0",
        background: "none",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 820,
          background: "#fff",
          borderRadius: 10,
          boxShadow: "0 2px 10px rgba(25, 118, 210, 0.05)",
          padding: "1.1rem 1.2rem 1.2rem 1.2rem",
          marginTop: 0,
          border: "1.5px solid #e3e8f0",
        }}
      >
        {!saved ? (
          <>
            <h1
              style={{
                fontSize: "1.3rem",
                fontWeight: 900,
                marginBottom: 10,
                color: "#2563eb",
                letterSpacing: "0.5px",
                textAlign: "center",
                borderBottom: "2px solid #e3e8f0",
                paddingBottom: 8,
              }}
            >
              Please Select The Services You Want Completed
            </h1>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: 18,
              }}
            >
              <thead>
                <tr style={{ background: "#f3f4f6" }}>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px 8px",
                      fontWeight: 700,
                      color: "#1746a0",
                      fontSize: "1.05rem",
                    }}
                  >
                    Select
                  </th>
                  <th
                    style={{
                      textAlign: "left",
                      padding: "10px 8px",
                      fontWeight: 700,
                      color: "#1746a0",
                      fontSize: "1.05rem",
                    }}
                  >
                    Service
                  </th>
                </tr>
              </thead>
              <tbody>
                {servicesCatalog.map((serviceObj) => (
                  <tr
                    key={serviceObj.service}
                    style={{ borderBottom: "1px solid #e3e8f0" }}
                  >
                    <td style={{ padding: "8px" }}>
                      <input
                        type="checkbox"
                        checked={!!selected[serviceObj.service]}
                        onChange={() => handleToggle(serviceObj.service)}
                      />
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        color: "#1746a0",
                        cursor: "pointer",
                        textDecoration: "underline",
                      }}
                      onClick={() => openDescModal(serviceObj.service)}
                    >
                      {serviceObj.service}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              onClick={handleSave}
              style={{
                background: "#2563eb",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 0",
                width: "100%",
                fontWeight: 700,
                fontSize: "1rem",
                marginTop: 16,
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              Save my Selections
            </button>
          </>
        ) : (
          <>
            <h1
              style={{
                fontSize: "1.3rem",
                fontWeight: 900,
                marginBottom: 10,
                color: "#2563eb",
                letterSpacing: "0.5px",
                textAlign: "center",
                borderBottom: "2px solid #e3e8f0",
                paddingBottom: 8,
              }}
            >
              Customize Frequency for Your Selected Services
            </h1>
            {selectedServices.length === 0 ? (
              <div
                style={{
                  color: "#64748b",
                  textAlign: "center",
                  margin: "2rem 0",
                }}
              >
                You have not selected any services. <br />
                <button
                  onClick={() => setSaved(false)}
                  style={{
                    marginTop: 12,
                    background: "#2563eb",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 20px",
                    fontWeight: 600,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  Select Services
                </button>
              </div>
            ) : (
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginTop: 18,
                }}
              >
                <thead>
                  <tr style={{ background: "#f3f4f6" }}>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 8px",
                        fontWeight: 700,
                        color: "#1746a0",
                        fontSize: "1.05rem",
                      }}
                    >
                      Service
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 8px",
                        fontWeight: 700,
                        color: "#1746a0",
                        fontSize: "1.05rem",
                      }}
                    >
                      Frequency
                    </th>
                    <th
                      style={{
                        textAlign: "left",
                        padding: "10px 8px",
                        fontWeight: 700,
                        color: "#1746a0",
                        fontSize: "1.05rem",
                      }}
                    >
                      Time Estimate (min)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedServices.map((service) => (
                    <tr
                      key={service}
                      style={{ borderBottom: "1px solid #e3e8f0" }}
                    >
                      <td
                        style={{
                          padding: "8px",
                          color: "#1746a0",
                          cursor: "pointer",
                          textDecoration: "underline",
                        }}
                        onClick={() => openDescModal(service)}
                      >
                        {service}
                      </td>
                      <td style={{ padding: "8px" }}>
                        <button
                          onClick={() => openModal(service)}
                          style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            borderRadius: 6,
                            padding: "4px 10px",
                            fontSize: "0.98rem",
                            fontWeight: 600,
                            cursor: "pointer",
                            letterSpacing: "0.2px",
                          }}
                        >
                          {frequencies[service]
                            ? frequencies[service]
                            : "Customize Frequency"}
                        </button>
                      </td>
                      <td style={{ padding: "8px", color: "#64748b" }}>
                        {serviceDetails[service]?.time || "N/A"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <button
              onClick={() => setSaved(false)}
              style={{
                background: "#e5e7eb",
                color: "#1746a0",
                border: "none",
                borderRadius: 6,
                padding: "8px 0",
                width: "100%",
                fontWeight: 700,
                fontSize: "1rem",
                marginTop: 24,
                cursor: "pointer",
                letterSpacing: "0.5px",
              }}
            >
              Back to Service Selection
            </button>
          </>
        )}
        <FrequencyModal
          open={!!modalService}
          onClose={closeModal}
          service={modalService}
          value={modalService ? frequencies[modalService] || "" : ""}
          onSave={handleFrequencySave}
        />
        <DescriptionModal
          open={!!descModalService}
          onClose={closeDescModal}
          service={descModalService}
        />
      </div>
    </div>
  );
}
