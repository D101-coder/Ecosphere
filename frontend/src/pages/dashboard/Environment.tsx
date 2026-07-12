import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Environment() {
  const [goals, setGoals] = useState<any[]>([]);
  useEffect(() => {
    api.get("/environment/goals").then(r => setGoals(r.data));
  }, []);
  return (
    <div>
      <h2>Environmental Goals</h2>
      <table className="table">
        <thead>
          <tr><th>Name</th><th>Department</th><th>Target CO2</th><th>Current CO2</th><th>Progress</th><th>Deadline</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {goals.map(g => {
            const progress = g.target_co2 ? Math.min(100, Math.round((g.current_co2 / g.target_co2) * 100)) : 0;
            return (
              <tr key={g.id}>
                <td>{g.title}</td>
                <td>{g.department_id}</td>
                <td>{g.target_co2}</td>
                <td>{g.current_co2}</td>
                <td>
                  <div className="progress">
                    <div className="bar" style={{ width: `${progress}%` }} aria-valuenow={progress}>{progress}%</div>
                  </div>
                </td>
                <td>{g.deadline}</td>
                <td><span className={`chip status-${g.status}`}>{g.status}</span></td>
                <td>
                  <button className="btn small">View</button>
                  <button className="btn small">Edit</button>
                  <button className="btn small danger">Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
