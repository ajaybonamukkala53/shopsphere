import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <div
      className="
        sticky top-0 z-50
        bg-white text-black
        dark:bg-gray-900 dark:text-white
        px-10 py-5
        flex justify-between items-center
        shadow-xl
      "
    >
      {/* LOGO */}
      <Link to="/">
        <h1 className="text-4xl font-extrabold">
          ShopSphere
        </h1>
      </Link>

      {/* NAVIGATION */}
      <div className="flex gap-6 text-lg items-center flex-wrap">
        <Link
          to="/admin-analytics"
          className="hover:text-pink-400 duration-300"
        >
          Analytics
        </Link>

        <Link
          to="/"
          className="hover:text-pink-400 duration-300"
        >
          Home
        </Link>

        <Link
          to="/cart"
          className="hover:text-pink-400 duration-300"
        >
          Cart
        </Link>

        <Link
          to="/checkout"
          className="hover:text-pink-400 duration-300"
        >
          Checkout
        </Link>

        <Link
          to="/wishlist"
          className="hover:text-pink-400 duration-300"
        >
          Wishlist
        </Link>

        <Link
          to="/orders"
          className="hover:text-pink-400 duration-300"
        >
          Orders
        </Link>

        <Link
          to="/admin"
          className="hover:text-pink-400 duration-300"
        >
          Admin Panel
        </Link>

        <Link
          to="/admin-orders"
          className="hover:text-pink-400 duration-300"
        >
          Admin Orders
        </Link>

        {user ? (
          <Link
            to="/profile"
            className="hover:text-pink-400 duration-300"
          >
            {user.name}
          </Link>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-pink-400 duration-300"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="hover:text-pink-400 duration-300"
            >
              Register
            </Link>
          </>
        )}

        {/* DARK MODE TOGGLE */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="
            px-4 py-2 rounded-xl font-bold
            bg-black text-white
            dark:bg-white dark:text-black
            hover:scale-105 duration-300
          "
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}

export default Navbar;