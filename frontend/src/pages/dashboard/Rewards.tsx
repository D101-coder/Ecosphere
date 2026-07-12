import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Rewards() {
  const [rewards, setRewards] = useState<any[]>([]);
  const [msg, setMsg] = useState("");
  useEffect(() => {
    api.get("/game/rewards").then(r => setRewards(r.data)).catch(()=>{});
  }, []);

  async function redeem(id:number) {
    try {
      await api.post(`/game/rewards/${id}/redeem`);
      setMsg("Redeemed successfully");
    } catch (err:any) {
      setMsg(err.response?.data?.error || "Redeem failed");
    }
  }

  return (
    <div>
      <h2>Rewards</h2>
      <div className="cards">
        {rewards.map(r => (
          <div className="card" key={r.id}>
            <h3>{r.name}</h3>
            <p>{r.description}</p>
            <div>Points {r.points_required} • Stock {r.stock}</div>
            <button className="btn" onClick={() => redeem(r.id)}>Redeem</button>
          </div>
        ))}
      </div>
      <div className="error">{msg}</div>
    </div>
  );
}
