import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import Navbar from "../components/Navbar";
import { FaStar, FaShoppingCart, FaBolt } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductAndReviews();
  }, [id]);

  const fetchProductAndReviews = async () => {
    try {
      setLoading(true);
      // Fetch product
      const { data: productsData } = await axios.get(`${API_URL}/api/products`);
      const single = productsData.find((item) => item._id === id);
      setProduct(single);

      // Fetch reviews
      const { data: reviewsData } = await axios.get(`${API_URL}/api/reviews/${id}`);
      setReviews(reviewsData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addReview = async (e) => {
    e.preventDefault();
    if (!userName || !rating || !comment) {
      alert("Please fill all review fields ❌");
      return;
    }
    try {
      await axios.post(`${API_URL}/api/reviews`, {
        productId: id,
        userName,
        rating: Number(rating),
        comment,
      });

      alert("Review Added ✅");
      setUserName("");
      setRating("");
      setComment("");
      
      // Refresh reviews
      const { data } = await axios.get(`${API_URL}/api/reviews/${id}`);
      setReviews(data);
    } catch (error) {
      console.log(error);
      alert("Failed to add review ❌");
    }
  };

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Added To Cart 🛒");
  };

  const handleBuyNow = () => {
    dispatch(addToCart(product));
    navigate("/checkout");
  };

  if (loading) {
    return (
      <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-flipkartBlue"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-3xl font-bold">Product Not Found ❌</h2>
          <Link to="/" className="mt-4 inline-block text-flipkartBlue font-bold hover:underline">Go Home</Link>
        </div>
      </div>
    );
  }

  const originalPrice = Math.round(product.price * 1.35);
  const discountPercent = 25;
  const stock = product.stock ?? 10;
  const lowStockAlert = product.lowStockAlert ?? 5;

  return (
    <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* LEFT COLUMN: Sticky Image & Action Buttons */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="sticky top-20 flex flex-col gap-4">
                {/* Media box */}
                <div className="w-full h-96 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-sm flex items-center justify-center p-4 overflow-hidden relative">
                  {product.video ? (
                    <video
                      key={product.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="max-h-full max-w-full object-contain"
                    >
                      <source src={product.video} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                {/* Buttons block */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="py-4 font-black uppercase text-sm tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors duration-200 bg-flipkartYellow text-black hover:bg-yellow-500"
                  >
                    <FaShoppingCart size={15} />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="py-4 font-black uppercase text-sm tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-colors duration-200 bg-flipkartOrange text-white hover:bg-orange-600"
                  >
                    <FaBolt size={15} />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Info, Description, Reviews */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold">
                  {product.category}
                </span>
                <h1 className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 mt-1 leading-snug">
                  {product.title}
                </h1>
              </div>

              {/* Rating pill & details */}
              <div className="flex items-center gap-3">
                <span className="bg-flipkartGreen text-white text-xs font-black px-2 py-0.5 rounded-sm flex items-center gap-0.5">
                  <span>{product.rating || 4.2}</span>
                  <FaStar size={10} />
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-bold">
                  {reviews.length} Ratings & {reviews.length} Reviews
                </span>
              </div>

              {/* Pricing section */}
              <div className="border-b border-gray-100 dark:border-gray-800 pb-4">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-2xl md:text-3xl font-black text-black dark:text-white">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm md:text-base text-gray-400 line-through">
                    ₹{originalPrice.toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm md:text-base text-flipkartGreen font-bold">
                    {discountPercent}% off
                  </span>
                </div>
                
                {/* Stock alert */}
                <div className="mt-2 text-sm font-bold">
                  {stock === 0 || product.status === "out-of-stock" ? (
                    <span className="text-red-500">Out of Stock</span>
                  ) : stock <= lowStockAlert ? (
                    <span className="text-orange-500">Only {stock} items left!</span>
                  ) : (
                    <span className="text-flipkartGreen">In Stock</span>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2 border-b border-gray-100 dark:border-gray-800 pb-6">
                <h3 className="text-base font-bold text-gray-900 dark:text-gray-100">Product Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Reviews and Ratings header */}
              <div className="space-y-6">
                <h2 className="text-lg md:text-xl font-black border-b border-gray-100 dark:border-gray-800 pb-2">
                  Ratings & Reviews 💬
                </h2>

                {/* Display reviews list */}
                <div className="space-y-4">
                  {reviews.length > 0 ? (
                    reviews.map((review) => (
                      <div
                        key={review._id}
                        className="border border-gray-100 dark:border-gray-800 p-4 rounded-sm"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <span className="bg-flipkartGreen text-white text-[10px] font-black px-1.5 py-0.5 rounded-sm flex items-center gap-0.5">
                              <span>{review.rating}</span>
                              <FaStar size={8} />
                            </span>
                            <span className="text-sm font-bold text-gray-800 dark:text-gray-200">
                              {review.userName}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">Certified Buyer</span>
                        </div>
                        <p className="text-xs md:text-sm mt-2 text-gray-600 dark:text-gray-300 font-normal">
                          {review.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-gray-500 text-sm">
                      No Reviews yet. Be the first to review this product!
                    </div>
                  )}
                </div>

                {/* Write Review Form */}
                <form
                  onSubmit={addReview}
                  className="bg-gray-50 dark:bg-gray-950 p-4 md:p-6 border border-gray-100 dark:border-gray-800 rounded-sm space-y-4"
                >
                  <h3 className="text-base font-black text-gray-800 dark:text-gray-200">Write a Product Review</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    />

                    <select
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    >
                      <option value="">Select Star Rating</option>
                      <option value="5">5 Stars (Excellent)</option>
                      <option value="4">4 Stars (Good)</option>
                      <option value="3">3 Stars (Average)</option>
                      <option value="2">2 Stars (Poor)</option>
                      <option value="1">1 Star (Very Bad)</option>
                    </select>
                  </div>

                  <textarea
                    placeholder="Describe your experience with the product..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows="3"
                    className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                  />

                  <button
                    type="submit"
                    className="bg-flipkartBlue hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 shadow transition-colors duration-200 cursor-pointer"
                  >
                    Submit Review
                  </button>
                </form>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

export default ProductDetails;