import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FaShoppingCart, FaHeart, FaUser, FaSun, FaMoon, FaSearch } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-flipkartBlue text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">
        {/* LOGO */}
        <Link to="/" className="flex flex-col items-start leading-none">
          <span className="text-2xl font-black italic tracking-wide">
            ShopSphere
          </span>
          <span className="text-[10px] text-flipkartYellow italic font-bold flex items-center gap-0.5 mt-0.5">
            Explore <span className="text-white font-black">Plus</span>
            <span className="text-flipkartYellow text-[8px]">✦</span>
          </span>
        </Link>

        {/* SEARCH BAR */}
        <form 
          onSubmit={handleSearchSubmit} 
          className="flex-grow max-w-xl flex items-center bg-white rounded-sm overflow-hidden shadow-inner h-9"
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 text-sm text-black placeholder-gray-500 focus:outline-none h-full bg-white"
          />
          <button 
            type="submit" 
            className="px-4 text-flipkartBlue bg-white hover:bg-gray-100 transition-colors duration-200 h-full flex items-center justify-center border-l border-gray-200"
          >
            <FaSearch size={15} />
          </button>
        </form>

        {/* NAVIGATION ACTIONS */}
        <div className="flex items-center gap-6 text-sm font-semibold flex-wrap">
          {/* USER ACTIONS / LOGIN */}
          {user ? (
            <div className="relative group">
              <Link
                to="/profile"
                className="flex items-center gap-1.5 hover:text-flipkartYellow transition-colors duration-200"
              >
                <FaUser size={14} />
                <span>{user.name.split(" ")[0]}</span>
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-white text-flipkartBlue px-6 py-1 rounded-sm font-bold border border-white hover:bg-gray-100 transition-all duration-200 shadow-sm"
            >
              Login
            </Link>
          )}

          {/* ADMIN & ANALYTICS */}
          {user && user.role === "admin" && (
            <div className="flex items-center gap-4">
              <Link
                to="/admin-dashboard"
                className="hover:text-flipkartYellow transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link
                to="/admin-analytics"
                className="hover:text-flipkartYellow transition-colors duration-200"
              >
                Analytics
              </Link>
            </div>
          )}

          {/* ORDERS */}
          {user && (
            <Link
              to="/orders"
              className="hover:text-flipkartYellow transition-colors duration-200"
            >
              Orders
            </Link>
          )}

          {/* WISHLIST */}
          <Link
            to="/wishlist"
            className="flex items-center gap-1 hover:text-flipkartYellow transition-colors duration-200"
          >
            <FaHeart size={14} className="text-red-400 group-hover:scale-110 duration-200" />
            <span className="hidden sm:inline">Wishlist</span>
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="flex items-center gap-1.5 hover:text-flipkartYellow transition-colors duration-200 relative group"
          >
            <div className="relative">
              <FaShoppingCart size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-2.5 -right-2 bg-flipkartYellow text-black text-[10px] font-extrabold rounded-full w-4 h-4 flex items-center justify-center border border-flipkartBlue animate-pulse">
                  {cartCount}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          {/* DARK MODE TOGGLE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center text-white"
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <FaSun size={15} /> : <FaMoon size={15} />}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;