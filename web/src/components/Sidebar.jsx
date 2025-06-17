// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { menuConfig } from "../config/menuConfig";
import { useAuth } from "../context/AuthContext";

export default function DashboardLayout() {
  const { user } = useAuth();

  const items = menuConfig[user.role] || [];

  return (
    <>
      <style>{`
        .sidebar ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .sidebar li {
          margin: 0.5rem 0;
          padding: 0;
        }
        .sidebar {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 0.95rem;
          line-height: 1.4;
          width: 250px;
          background: #1e3559;
          color: #fff;
          display: flex;
          flex-direction: column;
          position: relative;
          height: 100vh;
          box-sizing: border-box;
          padding: 1rem;
          padding-bottom: 4rem;
        }
        .sidebar a {
          color: #fff;
          text-decoration: none;
          display: flex;
          align-items: center;
        }
        .sidebar a .icon {
          margin-right: 0.5rem;
        }
        .sidebar a.active {
          font-weight: bold;
        }
        .logout-btn {
          font-family: inherit;
          font-size: inherit;
          position: absolute;
          bottom: 1rem;
          left: 1rem;
          right: 1rem;
          background: #e74c3c;
          border: none;
          padding: 0.75rem;
          color: #fff;
          cursor: pointer;
          border-radius: 4px;
        }
        .logout-btn:hover {
          opacity: 0.9;
        }
      `}</style>
      <div
        className="dashboard-layout"
        style={{ display: "flex", flexDirection: "row" }}
      >
        <aside
          className="sidebar"
          style={{ height: "auto", overflow: "unset" }}
        >
          <h2>Menu</h2>
          <nav>
            <ul>
              {items.map(({ label, path, icon }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <span className="icon">{icon}</span>
                    <span className="label">{label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <main
          className="dashboard-main"
          style={{
            flex: 1,
            margin: 0,
            padding: 0,
            background: "none",
            border: "none",
          }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
}
