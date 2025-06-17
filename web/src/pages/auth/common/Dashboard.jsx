// src/pages/dashboards/Dashboard.jsx
import React from "react";
import { useAuth } from "../../context/AuthContext";
import "../../styles/Dashboard.css";
import HomeownerDashboard from "./HomeownerDashboard";
import ContractorDashboard from "./ContractorDashboard";
import ManagerDashboard from "./ManagerDashboard";

export default function Dashboard() {
  const { user, loading } = useAuth();
  if (loading) return <p>Loading...</p>;
  if (!user) return <p>Please log in to view your dashboard.</p>;

  switch (user.role) {
    case "homeowner":
      return <HomeownerDashboard />;
    case "contractor":
      return <ContractorDashboard />;
    case "manager":
      return <ManagerDashboard />;
    default:
      return <p>Unknown role: {user.role}</p>;
  }
}
