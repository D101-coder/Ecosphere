import React, { useEffect, useState } from "react";
import api from "../../services/api";
import { useParams } from "react-router-dom";

export default function ChallengeDetail() {
  const { id } = useParams();
  const [challenge, setChallenge] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (!id) return;
    api.get(`/game/challenges`).then(r => {
      const found = r.data.find((c:any) => String(c.id) === String(id));
      setChallenge(found);
    });
  }, [id]);

  async function submitProof(e:any) {
    e.preventDefault();
    if (!file) return setMsg("Please attach proof");
    const fd = new FormData();
    fd.append("proof", file);
    try {
      await api.post(`/game/challenges/${id}/join`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setMsg("Submitted");
    } catch (err:any) {
      setMsg(err.response?.data?.error || "Submit failed");
    }
  }

  if (!challenge) return <div>Loading</div>;
  return (
    <div>
      <h2>{challenge.title}</h2>
      <p>{challenge.description}</p>
      <form onSubmit={submitProof}>
        <label>Proof upload<input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0] || null)} /></label>
        <button className="btn primary" type="submit">Submit Proof</button>
      </form>
      <div className="error">{msg}</div>
    </div>
  );
}
