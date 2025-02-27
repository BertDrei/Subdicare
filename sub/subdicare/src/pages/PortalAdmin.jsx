import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../pages/page_css/portal.css";

import { handleLogin } from "../functions/Login.js";
const PortalAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const { success } = await handleLogin(email, password, navigate);
    if (success) {
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="portal-admin-page">
      <div className="header text-center">
        <h2>Admin & Moderator Login</h2>
      </div>
      <div className="form-container">
        <form onSubmit={handleLoginSubmit}>
          <div className="field">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-portal w-100">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default PortalAdmin;
