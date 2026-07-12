import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Governance() {
  const [audits, setAudits] = useState<any[]>([]);
  const [issues, setIssues] = useState<any[]>([]);
  useEffect(() => {
    api.get("/governance/audits").then(r => setAudits(r.data));
    api.get("/governance/issues").then(r => setIssues(r.data));
  }, []);
  return (
    <div>
      <h2>Governance</h2>
      <section>
        <h3>Audits</h3>
        <table className="table">
          <thead><tr><th>Title</th><th>Department</th><th>Auditor</th><th>Date</th><th>Findings</th><th>Status</th></tr></thead>
          <tbody>{audits.map(a => <tr key={a.id}><td>{a.title}</td><td>{a.department_id}</td><td>{a.auditor}</td><td>{a.date}</td><td>{a.findings}</td><td>{a.status}</td></tr>)}</tbody>
        </table>
      </section>
      <section>
        <h3>Compliance Issues</h3>
        <table className="table">
          <thead><tr><th>Issue</th><th>Severity</th><th>Department</th><th>Status</th><th>Owner</th></tr></thead>
          <tbody>{issues.map(i => <tr key={i.id}><td>{i.description}</td><td>{i.severity}</td><td>{i.department_id}</td><td>{i.status}</td><td>{i.owner_id}</td></tr>)}</tbody>
        </table>
      </section>
    </div>
  );
}
