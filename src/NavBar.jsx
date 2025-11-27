import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav style={{ background: "#333", padding: "10px" }}>
      <Link to="/CustomerHome" style={{ color: "white", marginRight: "10px" }}>Home</Link>
      <Link to="/CustomerDashboard" style={{ color: "white", marginRight: "10px" }}>Products</Link>
      <Link to="/cart" style={{ color: "white" }}>Cart</Link>
    </nav>
  );
}

export default NavBar;
