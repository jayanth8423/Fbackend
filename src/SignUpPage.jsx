import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import config from "./config";
import "./SignUpPage.css";

function SignupPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phno, setPhno] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Customer");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.apiUrl}${config.endpoints.signup}`, {
        username,
        email,
        phno,
        password,
        role,
      });

      alert("✅ Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      alert("❌ Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Phone:</label>
        <input
          type="text"
          value={phno}
          onChange={(e) => setPhno(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="Customer">Customer</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupPage;
