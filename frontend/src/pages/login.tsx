import React, { useState, useContext } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Login() {
  const [form, setForm] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const nav = useNavigate();
  const auth = useContext(AuthContext);

  async function submit(e: any) {
    e.preventDefault();
    try {
      const r = await api.post("/auth/login", { email: form.email, password: form.password });
      auth.login(r.data.access, r.data.refresh);
      nav("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.error || "Login failed");
    }
  }

  return (
    <div className="form-root">
      <h2>Login</h2>
      <form onSubmit={submit}>
        <label>Email<input onChange={e => setForm({...form, email: e.target.value})} /></label>
        <label>Password<input type="password" onChange={e => setForm({...form, password: e.target.value})} /></label>
        <div className="error">{error}</div>
        <button className="btn primary" type="submit">Login</button>
      </form>
    </div>
  );
}
