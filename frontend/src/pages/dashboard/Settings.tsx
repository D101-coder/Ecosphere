import React, { useEffect, useState } from "react";
import api from "../../services/api";

export default function Settings() {
  const [departments, setDepartments] = useState<any[]>([]);
  useEffect(() => {
    // placeholder: fetch departments
  }, []);
  return (
    <div>
      <h2>Settings</h2>
      <p>Manage departments categories notification settings and profile preferences here.</p>
    </div>
  );
}
