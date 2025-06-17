import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/SharedStyles.css";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [accountType, setAccountType] = useState("homeowner");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ email, password });
    if (res.success) {
      navigate("/dashboard", { replace: true });
    } else alert("Login failed");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          className="auth-card"
          style={{
            background: "#ffffff",
            borderRadius: "1rem",
            padding: "2.5rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "500px",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: 700,
              color: "#1e3a8a",
              marginBottom: "2rem",
              textAlign: "center",
            }}
          >
            Sign In to Home Manager
          </h2>
          <button
            type="button"
            style={{
              background: "#e0e7ff",
              color: "#2563eb",
              padding: "0.7rem 1.2rem",
              borderRadius: "0.5rem",
              border: "none",
              fontWeight: 600,
              fontSize: "1rem",
              marginBottom: "2rem",
              cursor: "pointer",
              width: "100%",
              transition: "background 0.2s",
            }}
            onClick={() => setShowOptions(true)}
          >
            Login Options
          </button>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: "#475569",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #e2e8f0",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  outline: "none",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.5rem",
                  fontWeight: 500,
                  color: "#475569",
                }}
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #e2e8f0",
                  fontSize: "1rem",
                  transition: "all 0.2s ease",
                  outline: "none",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.05)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <p>
              Forgot password?{" "}
              <button onClick={() => navigate("/forgot-password")}>
                Reset it here
              </button>
            </p>
            <button
              type="submit"
              style={{
                background: "#2563eb",
                color: "#ffffff",
                padding: "0.875rem",
                borderRadius: "0.5rem",
                border: "none",
                fontSize: "1rem",
                fontWeight: 600,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
                marginTop: "1rem",
              }}
            >
              Sign In
            </button>
          </form>
          <div
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "#475569",
            }}
          >
            <p style={{ marginBottom: "1rem" }}>
              Don't have an account?{" "}
              <Link
                to="/signup"
                style={{
                  color: "#2563eb",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                Create Account
              </Link>
            </p>
          </div>
          {/* Modal for login options */}
          {showOptions && (
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(30,41,59,0.35)",
                zIndex: 9999,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  background: "#fff",
                  borderRadius: "1rem",
                  boxShadow: "0 8px 32px rgba(30,58,138,0.18)",
                  padding: "2.5rem 2rem",
                  minWidth: "320px",
                  maxWidth: "90vw",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <button
                  onClick={() => setShowOptions(false)}
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    background: "none",
                    border: "none",
                    fontSize: "1.5rem",
                    color: "#64748b",
                    cursor: "pointer",
                  }}
                  aria-label="Close"
                >
                  ×
                </button>
                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 700,
                    color: "#1e3a8a",
                    marginBottom: "1.5rem",
                  }}
                >
                  Select Account Type
                </h3>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <button
                    style={{
                      padding: "0.9rem 1.2rem",
                      borderRadius: "0.5rem",
                      border:
                        accountType === "manager"
                          ? "2px solid #2563eb"
                          : "2px solid #e2e8f0",
                      background:
                        accountType === "manager" ? "#e0e7ff" : "#f8fafc",
                      color: "#1e3a8a",
                      fontWeight: 600,
                      fontSize: "1.08rem",
                      cursor: "pointer",
                      transition: "all 0.18s",
                    }}
                  >
                    Manager
                  </button>
                  <button
                    style={{
                      padding: "0.9rem 1.2rem",
                      borderRadius: "0.5rem",
                      border:
                        accountType === "contractor"
                          ? "2px solid #2563eb"
                          : "2px solid #e2e8f0",
                      background:
                        accountType === "contractor" ? "#e0e7ff" : "#f8fafc",
                      color: "#1e3a8a",
                      fontWeight: 600,
                      fontSize: "1.08rem",
                      cursor: "pointer",
                      transition: "all 0.18s",
                    }}
                  >
                    Contractor
                  </button>
                  <button
                    onClick={() => handleMockLogin("homeowner")}
                    style={{
                      padding: "0.9rem 1.2rem",
                      borderRadius: "0.5rem",
                      border:
                        accountType === "homeowner"
                          ? "2px solid #2563eb"
                          : "2px solid #e2e8f0",
                      background:
                        accountType === "homeowner" ? "#e0e7ff" : "#f8fafc",
                      color: "#1e3a8a",
                      fontWeight: 600,
                      fontSize: "1.08rem",
                      cursor: "pointer",
                      transition: "all 0.18s",
                    }}
                  >
                    Homeowner
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
