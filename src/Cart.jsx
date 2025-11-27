import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "./config";
import "./Cart.css";

function Cart() {
  const { cart, setCart, increment, decrement } = useContext(CartContext);
  const navigate = useNavigate();

  // Get logged-in user email from localStorage (set it after login)
  const email = localStorage.getItem("email");

  const totalBill = cart.reduce(
    (sum, item) => sum + item.quantity * (Number(item.pprs) || 0),
    0
  );

  // Fetch cart from backend on page load
  useEffect(() => {
    if (!email) {
      setCart([]); // clear if not logged in
      return;
    }

    axios
      .get(`${config.apiUrl}${config.endpoints.getCart(email)}`)
      .then((res) => {
        const data = res.data;

        // backend might return either:
        // - a semicolon-separated string like "Milk x 2 = ₹40;Bread x 1 = ₹30;"
        // - OR an array of order objects [{ productName, quantity, price }, ...]
        // handle both formats robustly:
        if (!data) {
          setCart([]);
          return;
        }

        if (typeof data === "string") {
          if (data.trim() === "Customer not found!") {
            setCart([]);
            return;
          }
          // parse "Name x qty = ₹Total;"
          const parsed = data
            .split(";")
            .filter(Boolean)
            .map((entry, index) => {
              const [productPart = "", pricePart = "0"] = entry.split("= ₹");
              const [namePart = "", qtyPart = "1"] = productPart.trim().split(" x ");
              const name = namePart.trim();
              const qty = parseInt(qtyPart?.trim(), 10) || 1;
              const totalPrice = parseFloat((pricePart || "0").trim()) || 0;
              const unitPrice = qty ? totalPrice / qty : totalPrice;
              return {
                pid: index + 1,
                pname: name,
                quantity: qty,
                pprs: unitPrice,
              };
            });
          setCart(parsed);
          return;
        }

        if (Array.isArray(data)) {
          // assume array of objects: { productName, quantity, price } or similar
          const mapped = data.map((it, idx) => {
            const quantity = Number(it.quantity) || Number(it.qty) || 1;
            const total = Number(it.price) || Number(it.total) || 0;
            const unit = quantity ? total / quantity : Number(it.unitPrice) || 0;
            return {
              pid: it.pid || it.id || idx + 1,
              pname: it.productName || it.pname || it.name || "",
              quantity,
              pprs: unit,
            };
          });
          setCart(mapped);
          return;
        }

        // fallback
        setCart([]);
      })
      .catch((err) => {
        console.error("Error fetching cart:", err);
        setCart([]);
      });
  }, [email, setCart]);

  // Place order (save cart to backend)
  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (!email) {
      alert("Please login first!");
      return;
    }

    // Prepare payload
    const orders = cart.map((item) => ({
      email,
      productName: item.pname,
      quantity: item.quantity,
      price: Number(item.quantity) * Number(item.pprs || 0),
    }));

    try {
      const res = await axios.post(
        `${config.apiUrl}${config.endpoints.addCart}`,
        orders,
        { headers: { "Content-Type": "application/json" } }
      );

      // accept either plain text or JSON message
      const message =
        (typeof res.data === "string" && res.data) ||
        (res.data && res.data.message) ||
        "Orders saved successfully!";
      alert(message);
      // navigate to payment page if that's your flow
      navigate("/payment");
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong while placing the order.");
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <h2 style={{ textAlign: "center", marginTop: "50px" }}>
        🛒 Your cart is empty
      </h2>
    );
  }

  return (
    <div className="cart-container">
      <h2 className="text-center text-2xl font-bold mb-6">🛍️ Your Cart</h2>
      <div className="cart-items">
        {cart.map((item) => (
          <div key={item.pid} className="cart-item-card">
            <h3 className="text-lg font-semibold capitalize">{item.pname}</h3>
            <p className="text-green-700 font-medium">Price: ₹{item.pprs}</p>
            <div className="quantity-control">
              <button onClick={() => decrement(item.pid)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increment(item.pid)}>+</button>
            </div>
            <p>Total: ₹{item.quantity * item.pprs}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <h3 className="text-xl font-bold text-gray-800">🧾 Total Bill: ₹{totalBill}</h3>
      </div>

      <div className="text-center mt-4">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-full"
        >
          ✅ Place Order
        </button>
      </div>
    </div>
  );
}

export default Cart;
