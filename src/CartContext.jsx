// CartContext.jsx
import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const existingItem = cart.find((i) => i.pid === item.pid);
    if (existingItem) {
      setCart(
        cart.map((i) =>
          i.pid === item.pid ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const increment = (pid) => {
    setCart(
      cart.map((item) =>
        item.pid === pid ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decrement = (pid) => {
    setCart(
      cart
        .map((item) =>
          item.pid === pid
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const placeOrder = () => {
    alert("🎉 Order placed successfully!");
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, increment, decrement, placeOrder }}
    >
      {children}
    </CartContext.Provider>
  );
};

