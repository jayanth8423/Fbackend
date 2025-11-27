import React from "react";
import { Link } from "react-router-dom";

const CustomerHome = () => {
  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Welcome to JSN Stores 🛍️</h1>
      <p>Your one-stop shop for groceries and more!</p>

      <div style={{ marginTop: "20px" }}>
        <Link to="/CustomerDashboard">
          <button style={{ padding: "10px 20px", fontSize: "16px" }}>
            🛒 Start Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CustomerHome;
