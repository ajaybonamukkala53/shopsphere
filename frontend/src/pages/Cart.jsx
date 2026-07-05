import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, increaseQuantity, decreaseQuantity } from "../redux/cartSlice";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  // Math for Flipkart style discount display
  const itemsWithPricing = cartItems.map(item => {
    const qty = item.quantity || 1;
    const price = item.price;
    const originalPrice = Math.round(price * 1.35);
    const savings = originalPrice - price;
    return {
      ...item,
      qty,
      totalItemPrice: price * qty,
      totalOriginalPrice: originalPrice * qty,
      totalSavings: savings * qty
    };
  });

  const totalMRP = itemsWithPricing.reduce((acc, item) => acc + item.totalOriginalPrice, 0);
  const totalDiscount = itemsWithPricing.reduce((acc, item) => acc + item.totalSavings, 0);
  const finalPrice = itemsWithPricing.reduce((acc, item) => acc + item.totalItemPrice, 0);
  const deliveryCharge = finalPrice > 500 || finalPrice === 0 ? 0 : 40;
  const totalAmount = finalPrice + deliveryCharge;

  return (
    <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2">
          <FaShoppingBag className="text-flipkartBlue" />
          My Cart <span className="text-sm font-normal text-gray-500">({cartItems.length} items)</span>
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* CART ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800">
                {itemsWithPricing.map((item) => (
                  <div
                    key={item._id}
                    className="p-4 md:p-6 border-b border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between gap-4 last:border-0"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 md:w-28 md:h-28 flex-shrink-0 bg-gray-50 dark:bg-gray-950 p-1 border border-gray-100 dark:border-gray-800 flex items-center justify-center">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Product Details */}
                      <div>
                        <h2 className="text-sm md:text-base font-semibold text-gray-900 dark:text-gray-100 line-clamp-2 hover:text-flipkartBlue transition-colors duration-200">
                          <Link to={`/product/${item._id}`}>{item.title}</Link>
                        </h2>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Category: {item.category}</p>
                        
                        {/* Price Details */}
                        <div className="flex items-baseline gap-2 mt-3">
                          <span className="text-base md:text-lg font-bold">₹{item.price.toLocaleString("en-IN")}</span>
                          <span className="text-xs text-gray-400 line-through">₹{Math.round(item.price * 1.35).toLocaleString("en-IN")}</span>
                          <span className="text-xs text-flipkartGreen font-bold">25% Off</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions and Quantity Selector */}
                    <div className="flex md:flex-col justify-between items-center md:items-end gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1">
                        <button
                          disabled={item.qty <= 1}
                          onClick={() => dispatch(decreaseQuantity(item._id))}
                          className={`w-7 h-7 rounded-full border flex items-center justify-center font-bold text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                            item.qty <= 1 ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
                          }`}
                        >
                          <FaMinus size={10} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.qty}</span>
                        <button
                          onClick={() => dispatch(increaseQuantity(item._id))}
                          className="w-7 h-7 rounded-full border flex items-center justify-center font-bold text-gray-600 dark:text-gray-400 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                          <FaPlus size={10} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => dispatch(removeFromCart(item._id))}
                        className="text-xs md:text-sm font-bold text-gray-500 hover:text-red-500 flex items-center gap-1.5 focus:outline-none cursor-pointer transition-colors duration-200"
                      >
                        <FaTrash size={12} />
                        <span>REMOVE</span>
                      </button>
                    </div>
                  </div>
                ))}
                
                {/* BOTTOM ORDER CTA */}
                <div className="p-4 flex justify-end border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 sticky bottom-0 z-10 shadow-md md:shadow-none">
                  <Link
                    to="/checkout"
                    className="bg-flipkartOrange text-white text-center py-3 px-8 font-black uppercase text-sm tracking-wider shadow hover:bg-orange-600 transition-all duration-200"
                  >
                    Place Order
                  </Link>
                </div>
              </div>
            </div>

            {/* PRICE SUMMARY CARD */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 sticky top-20">
                <div className="p-4 border-b border-gray-100 dark:border-gray-800">
                  <h3 className="text-gray-500 dark:text-gray-400 font-bold uppercase text-xs tracking-wider">
                    Price Details
                  </h3>
                </div>

                <div className="p-4 space-y-4 text-sm font-semibold">
                  <div className="flex justify-between">
                    <span>Price ({cartItems.length} items)</span>
                    <span>₹{totalMRP.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between text-flipkartGreen">
                    <span>Discount</span>
                    <span>- ₹{totalDiscount.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    {deliveryCharge === 0 ? (
                      <span className="text-flipkartGreen font-bold">FREE</span>
                    ) : (
                      <span>₹{deliveryCharge}</span>
                    )}
                  </div>

                  <hr className="border-gray-100 dark:border-gray-800" />

                  <div className="flex justify-between text-base font-black">
                    <span>Total Amount</span>
                    <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <hr className="border-gray-100 dark:border-gray-800" />

                  <p className="text-flipkartGreen text-xs font-bold text-center">
                    You will save ₹{totalDiscount.toLocaleString("en-IN")} on this order
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 py-16 px-4 text-center max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-8xl mb-4">🛒</span>
            <h2 className="text-2xl font-black text-gray-800 dark:text-gray-200">Your Cart is Empty!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-sm">
              Add items to it now to start shopping.
            </p>
            <Link
              to="/"
              className="mt-6 bg-flipkartBlue text-white font-bold px-8 py-3 rounded-sm shadow hover:bg-blue-600 transition-all duration-200"
            >
              Shop Now
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Cart;