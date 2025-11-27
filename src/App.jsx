import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import CustomerDashboard from "./CustomerDashboard";
import Cart from "./Cart";
import ForgotPassword from "./ForgotPassword";
import CustomerHome from "./CustomerHome";
import NavBar from "./NavBar";
import { CartProvider } from "./CartContext";

function Layout() {
  const location = useLocation();

  // ✅ Hide navbar only on Admin pages
  const hideNavbarRoutes = ["/AdminDashboard"];

  return (
    <div>
      {/* ✅ Navbar visible in CustomerDashboard and all customer pages */}
      {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/CustomerHome" element={<CustomerHome />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/CustomerDashboard" element={<CustomerDashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/forgetpass" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <CartProvider>
      <Router>
        <Layout />
      </Router>
    </CartProvider>
  );
}

export default App;
