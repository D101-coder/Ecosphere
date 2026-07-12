import React, { useContext, useState } from "react";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Profile() {
  const { user, setUser } = useContext(AuthContext);
  const [form, setForm] = useState<any>({ full_name: user?.user?.full_name || "" });
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  async function submit(e: any) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("full_name", form.full_name);
    if (file) fd.append("profile_pic", file);
    try {
      await api.put("/users/me", fd, { headers: { "Content-Type": "multipart/form-data" } });
      const r = await api.get("/users/me");
      setUser(r.data);
      setMsg("Profile updated");
    } catch (err: any) {
      setMsg(err.response?.data?.error || "Update failed");
    }
  }

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={submit}>
        <label>Full name<input value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} /></label>
        <label>Profile picture<input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} /></label>
        <button className="btn primary" type="submit">Save</button>
        <div className="error">{msg}</div>
      </form>
    </div>
  );
}
