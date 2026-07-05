import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaHeart, FaTrash, FaShoppingCart, FaStar } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

const API_URL = import.meta.env.VITE_API_URL;

function Wishlist() {
  const [items, setItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;
      const { data } = await axios.get(`${API_URL}/api/wishlist/${user.email}`);
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/wishlist/${id}`);
      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = (item) => {
    const product = {
      _id: item.productId || item._id,
      title: item.title,
      image: item.image,
      price: item.price,
      category: item.category,
      rating: item.rating,
      stock: 10
    };
    dispatch(addToCart(product));
    alert("Added To Cart 🛒");
  };

  return (
    <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2">
          <FaHeart className="text-red-500" />
          My Wishlist <span className="text-sm font-normal text-gray-500">({items.length} items)</span>
        </h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {items.map((item) => {
              const prodId = item.productId || item._id;
              return (
                <div
                  key={item._id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full overflow-hidden"
                >
                  <Link to={`/product/${prodId}`} className="flex flex-col h-full">
                    {/* Image */}
                    <div className="w-full h-44 bg-gray-50 dark:bg-gray-950 flex items-center justify-center overflow-hidden p-2 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="max-h-full max-w-full object-contain hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>

                    {/* Details */}
                    <div className="p-3.5 flex flex-col flex-grow justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                          {item.category}
                        </span>
                        <h3 className="text-xs md:text-sm font-semibold text-gray-800 dark:text-gray-200 mt-1 line-clamp-2 leading-tight hover:text-flipkartBlue duration-200">
                          {item.title}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1.5 mt-2">
                          <span className="bg-flipkartGreen text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                            <span>{item.rating || 4.2}</span>
                            <FaStar size={8} />
                          </span>
                          <span className="text-[10px] text-gray-400 font-semibold">(58)</span>
                        </div>
                      </div>

                      <div>
                        {/* Price */}
                        <div className="flex items-baseline gap-1.5 mt-3.5 flex-wrap">
                          <span className="text-base font-bold text-black dark:text-white">
                            ₹{item.price.toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ₹{Math.round(item.price * 1.35).toLocaleString("en-IN")}
                          </span>
                          <span className="text-xs text-flipkartGreen font-bold">
                            25% off
                          </span>
                        </div>

                        {/* Actions */}
                        <div className="grid grid-cols-2 gap-2 mt-4 pt-2 border-t border-gray-100 dark:border-gray-800">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(item);
                            }}
                            className="w-full py-2 px-1 text-[11px] font-bold rounded-sm bg-flipkartYellow text-black hover:bg-yellow-500 flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer"
                          >
                            <FaShoppingCart size={10} />
                            <span>Add to Cart</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              removeWishlist(item._id);
                            }}
                            className="w-full py-2 px-1 text-[11px] font-bold rounded-sm border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/20 flex items-center justify-center gap-1 transition-colors duration-200 cursor-pointer"
                          >
                            <FaTrash size={10} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 py-16 px-4 text-center max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-8xl mb-4">❤️</span>
            <h2 className="text-2xl font-black text-gray-800 dark:text-gray-200">Your Wishlist is Empty!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-sm">
              Save your favorite items here to view them later.
            </p>
            <Link
              to="/"
              className="mt-6 bg-flipkartBlue text-white font-bold px-8 py-3 rounded-sm shadow hover:bg-blue-600 transition-all duration-200"
            >
              Discover Products
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Wishlist;