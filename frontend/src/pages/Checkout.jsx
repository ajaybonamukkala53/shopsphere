import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import { clearCart } from "../redux/cartSlice";
import { useNavigate, Link } from "react-router-dom";
import { FaMapMarkerAlt, FaTicketAlt, FaShoppingBag, FaCreditCard } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  // CALCULATE PRICES
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
  const baseDiscount = itemsWithPricing.reduce((acc, item) => acc + item.totalSavings, 0);
  const cartSubtotal = itemsWithPricing.reduce((acc, item) => acc + item.totalItemPrice, 0);
  
  // Total after base product discount
  const finalTotal = cartSubtotal - discount;
  const deliveryCharge = finalTotal > 500 || finalTotal === 0 ? 0 : 40;
  const totalAmount = finalTotal + deliveryCharge;

  // APPLY COUPON
  const applyCoupon = () => {
    if (coupon.trim() === "WELCOME50") {
      setDiscount(50);
      alert("WELCOME50 Applied ✅ (₹50 discount)");
    } else if (coupon.trim() === "SAVE10") {
      setDiscount(Math.round(cartSubtotal * 0.10));
      alert("SAVE10 Applied ✅ (10% discount)");
    } else if (coupon.trim() === "FREESHIP") {
      setDiscount(30);
      alert("FREESHIP Applied ✅ (₹30 discount)");
    } else {
      setDiscount(0);
      alert("Invalid Coupon ❌");
    }
  };

  // PLACE ORDER
  const placeOrder = async () => {
    if (!name || !phone || !address || !pincode) {
      alert("Please fill in all delivery fields ❌");
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please Login First");
        return;
      }

      const { data } = await axios.post(
        `${API_URL}/api/payment/create-order`,
        {
          amount: totalAmount,
        }
      );

      const options = {
        key: "rzp_test_SuiC4XnCGvntxx",
        amount: data.amount,
        currency: data.currency,
        name: "ShopSphere",
        description: "Order Payment",
        order_id: data.id,

        handler: async function (response) {
          try {
            const deliveryOtp = Math.floor(1000 + Math.random() * 9000);

            await axios.post(
              `${API_URL}/api/orders`,
              {
                products: cartItems,
                totalPrice: totalAmount,
                userEmail: user.email,
                paymentMethod: "Online",
                paymentStatus: "Paid",
                orderStatus: "Order Placed",
                deliveryOtp,
                razorpayPaymentId: response.razorpay_payment_id,
                coupon,
                discount: discount + baseDiscount,
                address: {
                  name,
                  phone,
                  address,
                  pincode,
                },
              }
            );

            alert(`Payment Successful ✅\n\nDelivery OTP: ${deliveryOtp}`);
            dispatch(clearCart());
            navigate("/payment-success");
          } catch (error) {
            console.log(error);
            alert("Order Creation Failed ❌");
          }
        },

        prefill: {
          name,
          email: user.email,
          contact: phone,
        },

        theme: {
          color: "#2874f0",
        },
      };

      if (!window.Razorpay) {
        alert("Razorpay SDK Not Loaded");
        return;
      }

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.log(error);
      alert("Payment Failed ❌");
    }
  };

  return (
    <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2">
          <FaCreditCard className="text-flipkartBlue" />
          Secure Checkout
        </h1>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* LEFT COLUMN: Delivery details & Summary */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* DELIVERY ADDRESS */}
              <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 p-4 md:p-6">
                <h2 className="text-base md:text-lg font-black mb-4 flex items-center gap-2 text-flipkartBlue border-b border-gray-100 dark:border-gray-800 pb-2">
                  <FaMapMarkerAlt />
                  1. Delivery Address
                </h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-500">Name</label>
                      <input
                        type="text"
                        placeholder="Receiver Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-500">Phone</label>
                      <input
                        type="text"
                        placeholder="10-digit mobile number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">Address</label>
                    <textarea
                      placeholder="Street address, apartment, suite, block"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows="3"
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-gray-500">Pincode</label>
                      <input
                        type="text"
                        placeholder="6-digit pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ORDER SUMMARY */}
              <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 p-4 md:p-6">
                <h2 className="text-base md:text-lg font-black mb-4 flex items-center gap-2 text-flipkartBlue border-b border-gray-100 dark:border-gray-800 pb-2">
                  <FaShoppingBag />
                  2. Order Summary
                </h2>

                <div className="space-y-4">
                  {itemsWithPricing.map((item) => (
                    <div
                      key={item._id}
                      className="flex gap-4 p-3 border border-gray-50 dark:border-gray-800 rounded-sm"
                    >
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-50 dark:bg-gray-950 p-1 flex items-center justify-center border border-gray-100 dark:border-gray-800">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-grow">
                        <h3 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 font-bold">Qty: {item.qty}</p>
                        <p className="text-xs font-bold text-flipkartGreen mt-1">₹{item.price.toLocaleString("en-IN")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* COUPON */}
              <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 p-4 md:p-6">
                <h2 className="text-base md:text-lg font-black mb-4 flex items-center gap-2 text-flipkartBlue border-b border-gray-100 dark:border-gray-800 pb-2">
                  <FaTicketAlt />
                  3. Apply Coupon
                </h2>

                <div className="flex gap-3">
                  <input
                    type="text"
                    placeholder="Enter coupon (e.g. WELCOME50, SAVE10)"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue flex-1"
                  />
                  <button
                    onClick={applyCoupon}
                    className="bg-flipkartBlue text-white font-bold px-6 py-2 rounded-sm hover:bg-blue-600 transition-colors duration-200 cursor-pointer text-sm"
                  >
                    Apply
                  </button>
                </div>

                <div className="mt-3 flex gap-2 flex-wrap">
                  <span className="text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 px-2 py-1 rounded font-bold border border-blue-100 dark:border-blue-900">WELCOME50 (Save ₹50)</span>
                  <span className="text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 px-2 py-1 rounded font-bold border border-blue-100 dark:border-blue-900">SAVE10 (Save 10% on Order)</span>
                  <span className="text-[10px] bg-blue-50 text-blue-600 dark:bg-blue-950/20 dark:text-blue-400 px-2 py-1 rounded font-bold border border-blue-100 dark:border-blue-900">FREESHIP (Save ₹30)</span>
                </div>
              </div>

            </div>

            {/* RIGHT COLUMN: Totals Summary */}
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
                    <span>Product Discount</span>
                    <span>- ₹{baseDiscount.toLocaleString("en-IN")}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-flipkartGreen">
                      <span>Coupon Discount</span>
                      <span>- ₹{discount.toLocaleString("en-IN")}</span>
                    </div>
                  )}

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
                    <span>Total Payable</span>
                    <span>₹{totalAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <hr className="border-gray-100 dark:border-gray-800" />

                  <p className="text-flipkartGreen text-xs font-bold text-center">
                    You save ₹{(baseDiscount + discount).toLocaleString("en-IN")} on this order
                  </p>
                  
                  <button
                    onClick={placeOrder}
                    className="w-full bg-flipkartOrange text-white text-center py-3.5 mt-4 font-black uppercase text-sm tracking-wider shadow hover:bg-orange-600 transition-all duration-200 cursor-pointer block"
                  >
                    Pay Now ₹{totalAmount.toLocaleString("en-IN")}
                  </button>
                </div>
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 py-16 px-4 text-center max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-8xl mb-4">🛒</span>
            <h2 className="text-2xl font-black text-gray-800 dark:text-gray-200">No Items to Checkout!</h2>
            <Link
              to="/"
              className="mt-6 bg-flipkartBlue text-white font-bold px-8 py-3 rounded-sm shadow hover:bg-blue-600 transition-all duration-200"
            >
              Go to Homepage
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Checkout;