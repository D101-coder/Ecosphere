import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Game() {
  const [challenges, setChallenges] = useState<any[]>([]);
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  useEffect(() => {
    api.get("/game/challenges").then(r => setChallenges(r.data));
    api.get("/game/leaderboard").then(r => setLeaderboard(r.data.rows);
    ).catch(()=>{});
  }, []);

  async function join(id:number) {
    const form = new FormData();
    await api.post(`/game/challenges/${id}/join`, form);
    alert("Joined challenge");
  }

  return (
    <div>
      <h2>GreenQuest</h2>
      <div className="grid">
        <div>
          <h3>Live Challenges</h3>
          {challenges.map(c => (
            <div className="card" key={c.id}>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              <div className="meta">XP {c.xp} • {c.difficulty}</div>
              <button className="btn" onClick={() => join(c.id)}>Join</button>
            </div>
          ))}
        </div>
        <div>
          <h3>Leaderboard</h3>
          <ol className="leaderboard">
            {leaderboard.map((l:any, idx:number) => <li key={idx}><strong>{l.user_id}</strong> <span>{l.points}</span></li>)}
          </ol>
        </div>
      </div>
    </div>
  );
}
