import React from "react";
import { Link } from "react-router-dom";
import "./welcome.css";

export default function Welcome() {
  return (
    <div className="welcome-root">
      <header className="topbar">
        <div className="brand">EcoSphere</div>
        <div className="controls">
          <DarkToggle />
        </div>
      </header>

      <main className="hero">
        <h1 className="title">Welcome to EcoSphere</h1>
        <p className="subtitle">Measure manage and improve your ESG performance</p>
        <div className="cta">
          <Link to="/login" className="btn primary">Login</Link>
          <Link to="/signup" className="btn outline">Sign up</Link>
        </div>
        <svg className="bg-anim" aria-hidden>
          <!-- inline SVG animations are in CSS file -->
        </svg>
      </main>
    </div>
  );
}

function DarkToggle() {
  const [dark, setDark] = React.useState(localStorage.getItem("dark") === "1");
  React.useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark ? "1" : "0");
  }, [dark]);
  return <button onClick={() => setDark(!dark)} className="dark-toggle" aria-label="toggle dark mode">{dark ? "☀️" : "🌙"}</button>;
}
