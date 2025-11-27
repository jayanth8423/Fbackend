import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dairy() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleSignup = () => {
    navigate("/SignUp");
  }
  return (
    <div>
      <header className="header">
        <div className="logo">JSN Stores</div>

        <div className="search-container">
          <input type="text" placeholder="🔍Search..." className="search-bar" />
        </div>

        <nav>
          <button className="signup-btn" onClick={handleLogin}>Login</button>
          <button className="signup-btn">About</button>
          <button className="signup-btn">Home</button>
          <button className="signup-btn" onClick={handleSignup}>SignUp</button>
        </nav>
      </header>

      <h1>Dairy Page</h1>
      <p>Welcome to the Dairy section of JSN Stores!</p>
      <p>login to view all the products</p>
    </div>
  );
}
