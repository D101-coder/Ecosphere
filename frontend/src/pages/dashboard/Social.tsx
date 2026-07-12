import React, { useEffect, useState, useContext } from "react";
import api from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";

export default function Social() {
  const [activities, setActivities] = useState<any[]>([]);
  const auth = useContext(AuthContext);

  useEffect(() => {
    api.get("/social/activities").then(r => setActivities(r.data));
  }, []);

  async function join(id: number) {
    const form = new FormData();
    // optional proof upload handled via file input in real UI
    await api.post(`/social/activities/${id}/join`, form);
    alert("Joined activity");
  }

  return (
    <div>
      <h2>CSR Activities</h2>
      {auth.user?.user?.role === "hr" && <button className="btn primary">Add new activity</button>}
      <div className="cards">
        {activities.map(a => (
          <div className="card" key={a.id}>
            <h3>{a.title}</h3>
            <p>{a.description}</p>
            <div className="meta">From {a.start_date} to {a.end_date}</div>
            <div className="actions">
              <button className="btn" onClick={() => join(a.id)}>Join</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
