// src/pages/SignUpPage.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "../../styles/SharedStyles.css";

const validateZipCode = async (zip, selectedCity, selectedState) => {
  try {
    console.log("Validating ZIP code:", zip);
    const res = await fetch(`https://api.zippopotam.us/us/${zip}`);
    if (!res.ok) throw new Error("Invalid ZIP code");

    const data = await res.json();
    const place = data.places[0];

    const cityMatch =
      place["place name"].toLowerCase() === selectedCity.toLowerCase();
    const stateMatch =
      place["state"].toLowerCase() === selectedState.toLowerCase();

    if (!cityMatch || !stateMatch) {
      return { valid: false, message: "Invalid Address" };
    }

    return { valid: true };
  } catch (err) {
    return { valid: false, message: "Invalid Address" };
  }
};

export default function SignUpPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [zipError, setZipError] = useState(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    if (form.zip.length != 5) {
      setZipError("ZIP code must be 5 digits");
      return;
    }

    const result = await validateZipCode(form.zip, form.city, form.state);
    if (!result.valid) {
      setZipError(result.message);
      return;
    } else {
      setZipError(null);
    }

    const res = await fetch(
      `${process.env.REACT_APP_API_URL}/api/user/signup`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    if (!res.ok) {
      alert("Registration failed");
      return;
    }
    const ok = await login({ email: form.email, password: form.password });
    if (ok) navigate("/dashboard", { replace: true });
    else alert("Signup succeeded but login failed");
  };

  return (
    <div
      className="page-wrapper"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--primary-color)",
        margin: "2rem auto",
        maxWidth: "1100px",
        borderRadius: "2.2rem",
        boxShadow: "0 8px 32px 0 rgba(30, 58, 138, 0.10)",
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          className="auth-card"
          style={{
            background: "#ffffff",
            borderRadius: "1rem",
            padding: "2rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.08)",
            width: "100%",
            maxWidth: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            margin: "0",
            maxHeight: "calc(100vh - 4rem)",
            overflowY: "auto",
            border: "2px solid var(--primary-color)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "var(--primary-color)",
            }}
          />
          <h2
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              color: "#1e3a8a",
              marginBottom: "0.5rem",
              textAlign: "center",
            }}
          >
            Create Your Account
          </h2>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}
          >
            <div
              className="form-row"
              style={{ display: "flex", gap: "0.5rem" }}
            >
              <div className="form-group" style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    color: "#475569",
                    fontSize: "0.98rem",
                  }}
                >
                  First Name
                </label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.98rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    color: "#475569",
                    fontSize: "0.98rem",
                  }}
                >
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.98rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>
            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.25rem",
                  fontWeight: 500,
                  color: "#475569",
                  fontSize: "0.98rem",
                }}
              >
                Street Address
              </label>
              <input
                name="street"
                value={form.street}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #e2e8f0",
                  fontSize: "0.98rem",
                  transition: "all 0.2s ease",
                  outline: "none",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div
              className="form-row"
              style={{ display: "flex", gap: "0.5rem" }}
            >
              <div className="form-group" style={{ flex: 2 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    color: "#475569",
                    fontSize: "0.98rem",
                  }}
                >
                  City
                </label>
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.98rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    color: "#475569",
                    fontSize: "0.98rem",
                  }}
                >
                  State
                </label>
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.98rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    color: "#475569",
                    fontSize: "0.98rem",
                  }}
                >
                  ZIP Code
                </label>
                <input
                  name="zip"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.98rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>
            {zipError && <p style={{ color: "red" }}>{zipError}</p>}

            <div className="form-group">
              <label
                style={{
                  display: "block",
                  marginBottom: "0.25rem",
                  fontWeight: 500,
                  color: "#475569",
                  fontSize: "0.98rem",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  borderRadius: "0.5rem",
                  border: "2px solid #e2e8f0",
                  fontSize: "0.98rem",
                  transition: "all 0.2s ease",
                  outline: "none",
                  boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>
            <div
              className="form-row"
              style={{ display: "flex", gap: "0.5rem" }}
            >
              <div className="form-group" style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    color: "#475569",
                    fontSize: "0.98rem",
                  }}
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.98rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
              <div className="form-group" style={{ flex: 1 }}>
                <label
                  style={{
                    display: "block",
                    marginBottom: "0.25rem",
                    fontWeight: 500,
                    color: "#475569",
                    fontSize: "0.98rem",
                  }}
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    borderRadius: "0.5rem",
                    border: "2px solid #e2e8f0",
                    fontSize: "0.98rem",
                    transition: "all 0.2s ease",
                    outline: "none",
                    boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
                  onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
                />
              </div>
            </div>
            <button
              className="btn-primary"
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
              Create Account
            </button>
          </form>
          <p
            style={{
              textAlign: "center",
              marginTop: "2rem",
              color: "#475569",
            }}
          >
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#2563eb",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <style>{`
        @media (max-width: 600px) {
          .auth-card {
            padding: 1rem !important;
            max-width: 98vw !important;
            min-width: 0 !important;
            border-radius: 0.7rem !important;
          }
          .form-row {
            flex-direction: column !important;
            gap: 0.1rem !important;
          }
          .form-group {
            width: 100% !important;
            min-width: 0 !important;
          }
          input, .auth-card input {
            font-size: 1rem !important;
            padding: 0.6rem !important;
            min-width: 0 !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          button.btn-primary {
            width: 100% !important;
            font-size: 1.08rem !important;
          }
        }
      `}</style>
    </div>
  );
}
