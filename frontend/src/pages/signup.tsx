import React, { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const departments = [
  { id: 1, name: "Human Resources" },
  { id: 2, name: "IT" },
  { id: 3, name: "Finance" },
  { id: 4, name: "Operations" },
  { id: 5, name: "Management" },
  { id: 6, name: "Marketing" }
];

export default function Signup() {
  const [form, setForm] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const nav = useNavigate();

  function validate() {
    const e: any = {};
    if (!form.full_name) e.full_name = "Full name is required";
    if (!form.employee_id) e.employee_id = "Employee id required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.password || form.password.length < 10) e.password = "Password must be at least 10 characters";
    if (form.password !== form.confirm_password) e.confirm_password = "Passwords do not match";
    if (!form.department_id) e.department_id = "Department required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit(e: any) {
    e.preventDefault();
    if (!validate()) return;
    try {
      await api.post("/auth/signup", {
        full_name: form.full_name,
        employee_id: form.employee_id,
        email: form.email,
        password: form.password,
        department_id: form.department_id
      });
      nav("/login");
    } catch (err: any) {
      setErrors({ form: err.response?.data?.error || "Signup failed" });
    }
  }

  return (
    <div className="form-root">
      <h2>Create account</h2>
      <form onSubmit={submit}>
        <label>Full name<input onChange={e => setForm({...form, full_name: e.target.value})} /></label>
        <div className="error">{errors.full_name}</div>
        <label>Employee id<input onChange={e => setForm({...form, employee_id: e.target.value})} /></label>
        <div className="error">{errors.employee_id}</div>
        <label>Email<input onChange={e => setForm({...form, email: e.target.value})} /></label>
        <div className="error">{errors.email}</div>
        <label>Department
          <select onChange={e => setForm({...form, department_id: Number(e.target.value)})} defaultValue="">
            <option value="" disabled>Choose</option>
            {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>
        </label>
        <div className="error">{errors.department_id}</div>
        <label>Password<input type="password" onChange={e => setForm({...form, password: e.target.value})} /></label>
        <div className="error">{errors.password}</div>
        <label>Confirm password<input type="password" onChange={e => setForm({...form, confirm_password: e.target.value})} /></label>
        <div className="error">{errors.confirm_password}</div>
        <div className="error">{errors.form}</div>
        <button className="btn primary" type="submit">Sign up</button>
      </form>
    </div>
  );
}
