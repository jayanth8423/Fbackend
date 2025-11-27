import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Fruits from "./fruits.jpg";
import Vegetables from "./Vegetables.jpg";
import spices from "./Spices.jpg";
import Milk from "./Milk.jpg";

export default function Home() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLogin = () => navigate("/Login");
  const handleSignup = () => navigate("/SignUp");
  const handleAbout = () => navigate("/About");
  
  const goToFruits = () => navigate("/Fruits");
  const goToVegetables = () => navigate("/Vegetables");
  const goToDairy = () => navigate("/Dairy");

  const sections = [
    {
      name: "Fruits",
      description: "Fresh and organic fruits available all year round.",
      image: Fruits,
      onClick: goToFruits,
    },
    {
      name: "Vegetables",
      description: "Wide variety of vegetables to keep you healthy.",
      image: Vegetables,
      onClick: goToVegetables,
    },
    {
      name: "Dairy Products",
      description: "High-quality dairy products from trusted suppliers.",
      image: Milk,
      onClick: goToDairy,
    },
    {
      name: "Spices",
      description: "Fresh spices, rich flavors—bring home the taste of perfection!",
      image: spices,
      onClick: null, // No page navigation defined
    },
  ];

  const filteredSections = sections.filter((section) =>
    section.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <header className="header">
        <div className="logo">JSN Stores</div>

        <div className="search-container">
          <input
            type="text"
            placeholder="🔍Search..."
            className="search-bar"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <nav>
          <button className="signup-btn" onClick={handleLogin}>Login</button>
          <button className="signup-btn" onClick={handleAbout}>About</button>
          <button className="signup-btn">Home</button>
          <button className="signup-btn" onClick={handleSignup}>SignUp</button>
        </nav>
      </header>

      <main>
        <div id="abv">
          <div className="sections-container">
            {filteredSections.map((section, index) => (
              <div
                key={index}
                className="section"
                onClick={section.onClick}
                style={{ cursor: section.onClick ? "pointer" : "default" }}
              >
                <h2>{section.name}</h2>
                <div className="image-box">
                  <img src={section.image} alt={section.name} className="section-image" />
                </div>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
