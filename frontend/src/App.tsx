import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { AuthProvider } from "./contexts/AuthContext";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </AuthProvider>
  );
}
import Profile from "./pages/dashboard/Profile";
import Badges from "./pages/dashboard/Badges";
import Rewards from "./pages/dashboard/Rewards";
import ChallengeDetail from "./pages/dashboard/ChallengeDetail";

// inside Routes in App component add:
<Route path="/dashboard/profile" element={<Profile />} />
<Route path="/dashboard/badges" element={<Badges />} />
<Route path="/dashboard/rewards" element={<Rewards />} />
<Route path="/dashboard/challenge/:id" element={<ChallengeDetail />} />

