// src/pages/SettingsPage.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import "../../../styles/SharedStyles.css";
import "../../../styles/SettingsPage.css";
import Sidebar from "../../../components/Sidebar";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
// import '../styles/Settings.css';

export default function SettingsPage() {
  const [tab, setTab] = useState("homeowner"); // 'homeowner' or 'account'

  // Homeowner form state
  const { user, loading } = useAuth();

  const [homeowner, setHomeowner] = useState(
    user || {
      email: "user@gmail.com",
      first_name: "user",
      isVerified: true,
      last_name: "data",
      role: "homeowner",
      address: {
        city: "San Francisco",
        state: "California",
        street: "123 Main St, Apt 4B, San Francisco, CA 94105",
        zip: "94105",
      },
    }
  );
  const [homeownerSaved, setHomeownerSaved] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Account form state
  const [account, setAccount] = useState({
    email: "",
    password: "",
    cardName: "",
    cardNumber: "",
    exp: "",
    cvv: "",
  });
  const [accountSaved, setAccountSaved] = useState(false);

  console.log("SettingsPage user:", user);

  function handleHomeownerChange(e) {
    setHomeowner({ ...homeowner, [e.target.name]: e.target.value });
    setHomeownerSaved(false);
  }
  function handleHomeownerSubmit(e) {
    e.preventDefault();
    // TODO: Save to backend
    setHomeownerSaved(true);
  }

  function handleAccountChange(e) {
    setAccount({ ...account, [e.target.name]: e.target.value });
    setAccountSaved(false);
  }
  function handleAccountSubmit(e) {
    e.preventDefault();
    // TODO: Save to backend
    setAccountSaved(true);
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value;
    setError("");
    try {
      console.log("enter request");
      const response = await axios.post(
        "http://localhost:4000/api/auth/forgot-password",
        { email }
      );
      console.log("response", response);
      setMessage(response.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to send reset link");
    }
  };

  // or a loader component

  return (
    <div className="settings-layout">
      {/* <Sidebar user={user} loading={loading} /> */}
      <div className="page-wrapper settings-page" style={{ padding: "1rem 0" }}>
        <div
          className="section-card settings-tabs"
          style={{ marginBottom: 10, padding: "0.5rem 0.5rem" }}
        >
          <button
            className={tab === "homeowner" ? "active" : ""}
            onClick={() => setTab("homeowner")}
          >
            Homeowner
          </button>
          <button
            className={tab === "account" ? "active" : ""}
            onClick={() => setTab("account")}
          >
            Account
          </button>
        </div>

        <div
          className="section-card settings-content"
          style={{
            maxHeight: "80vh",
            overflowY: "auto",
            padding: "1rem 1.2rem",
            marginBottom: 0,
          }}
        >
          {tab === "homeowner" && (
            <div className="homeowner-settings">
              <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>
                Homeowner Settings
              </h2>
              <form
                className="settings-form"
                onSubmit={handleHomeownerSubmit}
                autoComplete="off"
                style={{ fontSize: "0.98rem" }}
              >
                <div className="form-row">
                  <label>
                    First Name
                    <input
                      name="firstName"
                      value={homeowner.first_name}
                      onChange={handleHomeownerChange}
                      required
                    />
                  </label>
                  <label>
                    Last Name
                    <input
                      name="lastName"
                      value={homeowner.last_name}
                      onChange={handleHomeownerChange}
                      required
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Phone Number
                    <input
                      name="phone"
                      value={homeowner.phone}
                      placeholder="(123) 456-7890"
                      onChange={handleHomeownerChange}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Address
                    <input
                      name="address"
                      value={homeowner.address.street}
                      onChange={handleHomeownerChange}
                    />
                  </label>
                  <label>
                    City
                    <input
                      name="city"
                      value={homeowner.address.city}
                      onChange={handleHomeownerChange}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    State
                    <input
                      name="state"
                      value={homeowner.address.state}
                      onChange={handleHomeownerChange}
                    />
                  </label>
                  <label>
                    Zip
                    <input
                      name="zip"
                      value={homeowner.address.zip}
                      onChange={handleHomeownerChange}
                    />
                  </label>
                </div>
                <button
                  className="settings-button"
                  type="submit"
                  style={{ padding: "6px 18px", fontSize: "0.98rem" }}
                >
                  Save Changes
                </button>
                {homeownerSaved && (
                  <div className="success-message">Changes saved!</div>
                )}
              </form>
              <ul className="settings-links" style={{ marginTop: 8 }}>
                {/* Removed: <li><Link to="/settings/services">Manage Your Services</Link></li> */}
                {/* …other homeowner-specific settings here… */}
              </ul>
            </div>
          )}

          {tab === "account" && (
            <div className="account-settings">
              <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>
                Account Settings
              </h2>
              <form onSubmit={handleResetSubmit} className="settings-form">
                <div className="form-row">
                  <label>
                    Email
                    <input
                      name="email"
                      type="email"
                      value={account.email || homeowner.email}
                      onChange={handleAccountChange}
                      required
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="settings-button reset-password-btn"
                  style={{ padding: "6px 18px", fontSize: "0.98rem" }}
                >
                  Reset My Password
                </button>
              </form>
              <hr />
              <form
                className="settings-form"
                onSubmit={handleAccountSubmit}
                autoComplete="off"
                style={{ fontSize: "0.98rem" }}
              >
                <h3 style={{ fontSize: "1rem", margin: "8px 0" }}>
                  Payment Information
                </h3>
                <div className="form-row">
                  <label>
                    Cardholder Name
                    <input
                      name="cardName"
                      value={account.cardName}
                      onChange={handleAccountChange}
                    />
                  </label>
                  <label>
                    Card Number
                    <input
                      name="cardNumber"
                      value={account.cardNumber}
                      onChange={handleAccountChange}
                      maxLength={19}
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Expiration
                    <input
                      name="exp"
                      value={account.exp}
                      onChange={handleAccountChange}
                      placeholder="MM/YY"
                      maxLength={5}
                    />
                  </label>
                  <label>
                    CVV
                    <input
                      name="cvv"
                      value={account.cvv}
                      onChange={handleAccountChange}
                      maxLength={4}
                    />
                  </label>
                </div>
                <button
                  className="settings-button"
                  type="submit"
                  style={{ padding: "6px 18px", fontSize: "0.98rem" }}
                >
                  Save Changes
                </button>
                {accountSaved && (
                  <div className="success-message">Changes saved!</div>
                )}
                {message && <div className="success-message">{message}</div>}
                {error && (
                  <div className="error" style={{ color: "red" }}>
                    {error}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
