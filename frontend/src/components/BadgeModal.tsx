import React from "react";

export default function BadgeModal({ badge, onClose }: any) {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={`/${badge.icon_path}`} alt={badge.name} style={{ width: 96, height: 96 }} />
        <h3>{badge.name}</h3>
        <p>{badge.description}</p>
        <pre style={{ fontSize: 12 }}>{JSON.stringify(badge.unlock_rule)}</pre>
        <button className="btn primary" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
