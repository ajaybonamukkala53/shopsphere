import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        background: "black",
        padding: "20px",
        display: "flex",
        gap: "20px",
      }}
    >
      <Link to="/" style={{ color: "white" }}>
        Home
      </Link>

      <Link to="/cart" style={{ color: "white" }}>
        Cart
      </Link>

      <Link to="/checkout" style={{ color: "white" }}>
        Checkout
      </Link>

      <Link to="/add-product" style={{ color: "white" }}>
        Add Product
      </Link>

      <Link to="/orders" style={{ color: "white" }}>
        Orders
      </Link>
    </div>
  );
}

export default Navbar;