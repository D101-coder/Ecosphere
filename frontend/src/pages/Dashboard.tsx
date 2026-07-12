import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Environment from "./dashboard/Environment";
import Social from "./dashboard/Social";
import Governance from "./dashboard/Governance";
import Game from "./dashboard/Game";
import Reports from "./dashboard/Reports";
import Settings from "./dashboard/Settings";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-root">
      <Topbar />
      <div className="dashboard-body">
        <Sidebar />
        <main className="dashboard-main">
          <Routes>
            <Route path="/" element={<Environment />} />
            <Route path="social" element={<Social />} />
            <Route path="governance" element={<Governance />} />
            <Route path="game" element={<Game />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function Topbar() {
  return (
    <header className="dash-topbar">
      <div className="brand">EcoSphere</div>
      <div className="right-controls">
        <button className="menu-btn">☰</button>
      </div>
    </header>
  );
}

function Sidebar() {
  return (
    <aside className="dash-sidebar">
      <nav>
        <Link to="/">Environmental</Link>
        <Link to="/social">Social</Link>
        <Link to="/governance">Governance</Link>
        <Link to="/game">GreenQuest</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </nav>
    </aside>
  );
}
