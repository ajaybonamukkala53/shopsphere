import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  { name: "All Products", value: "", icon: "🛍️" },
  { name: "Mobiles", value: "Mobiles", icon: "📱" },
  { name: "Electronics", value: "Electronics", icon: "💻" },
  { name: "Fashion", value: "Fashion", icon: "👕" },
  { name: "Shoes", value: "Shoes", icon: "👟" }
];

const BANNERS = [
  {
    title: "Big Billion Days are Back!",
    subtitle: "Massive Discounts of up to 80% Off",
    bg: "from-blue-600 to-indigo-700",
    badge: "Limited Offer"
  },
  {
    title: "Upgrade to the Latest Mobiles",
    subtitle: "No Cost EMI starting at ₹999/month",
    bg: "from-purple-600 to-pink-600",
    badge: "Best Seller"
  },
  {
    title: "Step Up Your Fashion Game",
    subtitle: "Extra 10% off with SuperCoins",
    bg: "from-orange-500 to-red-600",
    badge: "Trending"
  }
];

function Home() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  // Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % BANNERS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let updated = [...products];

    // Hide inactive products from customer view
    updated = updated.filter((item) => item.status !== "inactive");

    if (search) {
      updated = updated.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category) {
      updated = updated.filter((item) => item.category === category);
    }

    setFilteredProducts(updated);
  }, [search, category, products]);

  return (
    <div className="min-h-screen bg-flipkartBg dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
      <Navbar />

      {/* CATEGORIES BAR */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm py-3 px-4 mb-4">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-8 md:gap-16 overflow-x-auto whitespace-nowrap scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setCategory(cat.value)}
              className={`flex flex-col items-center gap-1 group focus:outline-none cursor-pointer ${
                category === cat.value
                  ? "text-flipkartBlue font-bold scale-105"
                  : "text-gray-700 dark:text-gray-300 hover:text-flipkartBlue"
              } transition-all duration-200`}
            >
              <span className="text-2xl group-hover:scale-110 duration-200 transition-transform">
                {cat.icon}
              </span>
              <span className="text-xs font-semibold">{cat.name}</span>
              <span
                className={`h-0.5 w-8 bg-flipkartBlue rounded-full transition-transform duration-200 ${
                  category === cat.value ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-12">
        {/* CAROUSEL HERO SECTION */}
        <div className="relative rounded-sm overflow-hidden mb-6 shadow-sm h-48 md:h-72">
          {BANNERS.map((banner, index) => (
            <div
              key={banner.title}
              className={`absolute inset-0 bg-gradient-to-r ${
                banner.bg
              } text-white flex flex-col justify-center px-8 md:px-16 transition-opacity duration-700 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <span className="inline-block bg-white/20 text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full w-max mb-3">
                {banner.badge}
              </span>
              <h1 className="text-2xl md:text-5xl font-black leading-tight drop-shadow-md">
                {banner.title}
              </h1>
              <p className="text-sm md:text-xl mt-2 text-white/95">
                {banner.subtitle}
              </p>
            </div>
          ))}

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
            {BANNERS.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 w-2 rounded-full ${
                  index === currentSlide
                    ? "bg-white w-4"
                    : "bg-white/50 hover:bg-white"
                } transition-all duration-300`}
              />
            ))}
          </div>
        </div>

        {/* SEARCH AND CATEGORY HEADING SUMMARY */}
        {search && (
          <div className="bg-white dark:bg-gray-900 rounded-sm p-4 mb-4 shadow-sm text-sm">
            Showing results for "<span className="font-bold text-flipkartBlue">{search}</span>"
            {category && (
              <span>
                {" "}
                in <span className="font-bold">{category}</span>
              </span>
            )}
            <span className="text-gray-500 ml-1">({filteredProducts.length} items found)</span>
          </div>
        )}

        {/* MAIN PRODUCT GRID CONTAINER */}
        <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm p-4 md:p-6">
          <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-4 mb-6">
            <div className="flex flex-col">
              <h2 className="text-xl md:text-2xl font-black text-black dark:text-white flex items-center gap-2">
                {category || "All Products"} <span className="text-sm text-gray-500 font-normal">({filteredProducts.length} items)</span>
              </h2>
              <div className="h-1 w-16 bg-flipkartBlue rounded-full mt-1" />
            </div>
          </div>

          {/* PRODUCT CARDS LIST */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="text-6xl mb-4">🔍</span>
              <h3 className="text-2xl font-bold">No Products Found</h3>
              <p className="text-gray-500 mt-2 max-w-sm">
                We couldn't find any products matching your selection. Try clearing search filters.
              </p>
              <button
                onClick={() => {
                  setCategory("");
                  window.location.search = "";
                }}
                className="mt-6 bg-flipkartBlue text-white font-bold px-6 py-2 rounded-sm shadow hover:bg-blue-600 transition-all duration-200"
              >
                Reset Search & Category
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
