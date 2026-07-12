import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Badges() {
  const [badges, setBadges] = useState<any[]>([]);
  useEffect(() => {
    api.get("/game/badges").then(r => setBadges(r.data)).catch(()=>{});
  }, []);
  return (
    <div>
      <h2>Badges</h2>
      <div className="cards">
        {badges.map(b => (
          <div className="card" key={b.id}>
            <img src={`/${b.icon_path}`} alt={b.name} style={{ width: 64, height: 64 }} />
            <h3>{b.name}</h3>
            <p>{b.description}</p>
            <small>Unlock rule: {JSON.stringify(b.unlock_rule)}</small>
          </div>
        ))}
      </div>
    </div>
  );
}
