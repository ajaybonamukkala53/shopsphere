

import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaStar, FaHeart, FaShoppingCart, FaEye } from "react-icons/fa";
import axios from "axios";
import { addToCart } from "../redux/cartSlice";

const API_URL = import.meta.env.VITE_API_URL;

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const stock = product?.stock ?? 10;
  const lowStockAlert = product?.lowStockAlert ?? 5;

  // Simulate original price to show discount (standard Flipkart style)
  const originalPrice = Math.round(product.price * 1.35);
  const discountPercent = 25; // fixed 25% discount display

  const addWishlist = async (e) => {
    e.preventDefault(); // prevent navigation when clicking wishlist button
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please Login First");
        return;
      }

      await axios.post(`${API_URL}/api/wishlist`, {
        userEmail: user.email,
        productId: product._id,
        title: product.title,
        image: product.image,
        price: product.price,
        category: product.category,
        rating: product.rating,
      });

      alert("Added To Wishlist ❤️");
    } catch (error) {
      console.log(error);
      alert("Wishlist Failed ❌");
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault(); // prevent navigation
    dispatch(addToCart(product));
    alert("Added To Cart 🛒");
  };

  return (
    <div className="relative group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden">
      {/* FLOATING WISHLIST HEART */}
      <button
        onClick={addWishlist}
        className="absolute top-2.5 right-2.5 z-20 bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800 p-2 rounded-full shadow-sm text-gray-400 hover:text-red-500 transition-colors duration-200 focus:outline-none cursor-pointer"
        title="Add to Wishlist"
      >
        <FaHeart size={14} />
      </button>

      <Link to={`/product/${product._id}`} className="flex flex-col h-full">
        {/* PRODUCT IMAGE / VIDEO */}
        <div className="w-full h-44 bg-gray-50 dark:bg-gray-950 flex items-center justify-center overflow-hidden p-2 relative">
          {product.video ? (
            <video
              key={product.video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            >
              <source src={product.video} type="video/mp4" />
            </video>
          ) : (
            <img
              src={product.image}
              alt={product.title}
              className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          )}
        </div>

        {/* INFO SECTION */}
        <div className="p-3.5 flex flex-col flex-grow justify-between">
          <div>
            {/* CATEGORY */}
            <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
              {product.category}
            </span>

            {/* TITLE */}
            <h3 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1 line-clamp-2 leading-tight group-hover:text-flipkartBlue duration-200">
              {product.title}
            </h3>

            {/* RATING */}
            <div className="flex items-center gap-1.5 mt-2">
              <span className="bg-flipkartGreen text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                <span>{product.rating || 4.2}</span>
                <FaStar size={8} />
              </span>
              <span className="text-[10px] text-gray-400 font-semibold">(58)</span>
            </div>

            {/* STOCK INDICATOR */}
            <div className="mt-2 text-[11px] font-semibold">
              {stock === 0 || product.status === "out-of-stock" ? (
                <span className="text-red-500">Out of Stock</span>
              ) : stock <= lowStockAlert ? (
                <span className="text-orange-500">Only {stock} left!</span>
              ) : (
                <span className="text-flipkartGreen">In Stock</span>
              )}
            </div>
          </div>

          <div>
            {/* PRICING SECTION */}
            <div className="flex items-baseline gap-1.5 mt-3.5 flex-wrap">
              <span className="text-base font-bold text-black dark:text-white">
                ₹{product.price.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ₹{originalPrice.toLocaleString("en-IN")}
              </span>
              <span className="text-xs text-flipkartGreen font-bold">
                {discountPercent}% off
              </span>
            </div>

            {/* ACTION BUTTONS */}
            <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button
                onClick={handleAddToCart}
                className="w-full py-2 px-1 text-[11px] font-bold rounded-sm flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer bg-flipkartYellow text-black hover:bg-yellow-500"
              >
                <FaShoppingCart size={10} />
                <span>Add</span>
              </button>
              <button
                className="w-full py-2 px-1 text-[11px] font-bold rounded-sm border border-gray-300 hover:border-flipkartBlue hover:text-flipkartBlue text-gray-700 dark:text-gray-300 dark:border-gray-700 dark:hover:border-flipkartBlue flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer"
              >
                <FaEye size={10} />
                <span>View</span>
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;