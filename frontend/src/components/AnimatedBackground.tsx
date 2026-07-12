import React from "react";
import leaf from "../assets/leafs.svg";

export default function AnimatedBackground() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.12 }}>
      <img src={leaf} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
    </div>
  );
}
