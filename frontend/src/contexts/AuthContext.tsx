import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext<any>(null);

export const AuthProvider: React.FC<{children:any}> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("access") || null);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (token) {
      axios.get(`${import.meta.env.VITE_API_URL}/users/me`, { headers: { Authorization: `Bearer ${token}` } })
        .then(r => setUser(r.data))
        .catch(() => { setToken(null); localStorage.removeItem("access"); });
    }
  }, [token]);

  const login = (access: string, refresh: string) => {
    setToken(access);
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  };

  return <AuthContext.Provider value={{ token, user, login, logout, setUser }}>{children}</AuthContext.Provider>;
};
