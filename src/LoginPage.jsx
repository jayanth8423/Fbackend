import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./config";
import "./LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${config.apiUrl}${config.endpoints.login}`,
        { email, password }
      );

      const role = res.data.role;
      alert(`✅ Login successful as ${role}`);

      if (role === "Admin") {
        navigate("/AdminDashboard");
      } else if (role === "Manager") {
        navigate("/Managerdashboard");
      } else {
        navigate("/CustomerHome");
      }
    } catch (err) {
      alert("❌ Login failed");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>
      <button onClick={() => navigate("/signup")}>Signup</button>
    </div>
  );
}

export default LoginPage;
