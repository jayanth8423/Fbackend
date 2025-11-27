import { useEffect, useState, useContext } from "react";
import axios from "axios";
import config from "./config";
import { CartContext } from "./CartContext";


export default function CustomerDashboard() {
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const { cart, setCart } = useContext(CartContext);

  // ✅ Fetch products
  useEffect(() => {
    axios
      .get(`${conUrlfig.api}${config.endpoints.items}`)
      .then((res) => setItems(res.data))
      .catch(() => setError("❌ Failed to load products."));
  }, []);

  // ✅ Add to cart
  const handleAddToCart = (item) => {
    const existing = cart.find((c) => c.pid === item.pid);
    let updatedCart;
    if (existing) {
      updatedCart = cart.map((c) =>
        c.pid === item.pid ? { ...c, quantity: c.quantity + 1 } : c
      );
    } else {
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    setCart(updatedCart);

    // ✅ Sync with backend
    const email = localStorage.getItem("email");
    if (email) {
      axios
        .post(`${config.apiUrl}${config.endpoints.addCart}`, [
          {
            email,
            productName: item.pname,
            quantity: 1,
            price: item.pprs,
          },
        ])
        .catch((err) => console.error("Cart sync failed:", err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>🛍️ Available Products</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
        {items.map((item) => (
          <div
            key={item.pid}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              borderRadius: "8px",
              background: "#fff",
            }}
          >
            <img
              src={`${config.apiUrl}${config.endpoints.images(item.pimg)}`}
              alt={item.pname}
              style={{
                width: "100%",
                height: "150px",
                objectFit: "cover",
                borderRadius: "6px",
              }}
              onError={(e) => (e.target.src = "/default.png")}
            />
            <h3 style={{ marginTop: "10px" }}>{item.pname}</h3>
            <p>Price: ₹{item.pprs}</p>
            <p>Category: {item.pcategory}</p>
            <p>Quantity: {item.quantity}</p>
            <button
              onClick={() => handleAddToCart(item)}
              style={{
                background: "green",
                color: "white",
                padding: "6px 12px",
                border: "none",
                borderRadius: "5px",
                marginTop: "10px",
                cursor: "pointer",
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
