import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import generateInvoice from "../utils/generateInvoice";
import { FaBoxOpen, FaDownload, FaCheckCircle } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

const STEPS = [
  "Order Placed",
  "Packed",
  "Shipped",
  "Out For Delivery",
  "Delivered"
];

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Please Login First");
        return;
      }

      const { data } = await axios.get(`${API_URL}/api/orders/${user.email}`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getTrackingStep = (status) => {
    switch (status) {
      case "Order Placed":
        return 1;
      case "Packed":
        return 2;
      case "Shipped":
        return 3;
      case "Out For Delivery":
        return 4;
      case "Delivered":
        return 5;
      default:
        return 1;
    }
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

  return (
    <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        <h1 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2">
          <FaBoxOpen className="text-flipkartBlue" />
          My Orders <span className="text-sm font-normal text-gray-500">({orders.length} orders)</span>
        </h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => {
              const currentStep = getTrackingStep(order.orderStatus);

              return (
                <div
                  key={order._id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-sm shadow-sm p-4 md:p-6 space-y-6"
                >
                  {/* Top Order Meta */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Order ID</p>
                      <h2 className="text-sm md:text-base font-black text-gray-900 dark:text-gray-100">{order._id}</h2>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs font-semibold">
                      <div className="bg-gray-50 dark:bg-gray-950 px-3 py-2 rounded-sm border border-gray-100 dark:border-gray-800">
                        <span className="text-gray-400 mr-1">Payment Method:</span>
                        <span>{order.paymentMethod || "Online"}</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-950 px-3 py-2 rounded-sm border border-gray-100 dark:border-gray-800">
                        <span className="text-gray-400 mr-1">Payment Status:</span>
                        <span className="text-flipkartGreen font-bold">{order.paymentStatus || "Paid"}</span>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-950 px-3 py-2 rounded-sm border border-gray-100 dark:border-gray-800">
                        <span className="text-gray-400 mr-1">Delivery OTP:</span>
                        <span className="text-flipkartOrange font-black">{order.deliveryOtp}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Step Component */}
                  <div className="py-4 overflow-x-auto whitespace-nowrap scrollbar-none">
                    <div className="min-w-[600px] flex items-center justify-between px-4 relative">
                      {/* Connecting Background Line */}
                      <div className="absolute top-5 left-10 right-10 h-1 bg-gray-200 dark:bg-gray-800 -z-0" />
                      {/* Connecting Active Line */}
                      <div
                        className="absolute top-5 left-10 h-1 bg-flipkartGreen -z-0 transition-all duration-500"
                        style={{
                          width: `${((currentStep - 1) / (STEPS.length - 1)) * 94}%`,
                        }}
                      />

                      {STEPS.map((step, idx) => {
                        const stepNum = idx + 1;
                        const isDone = currentStep >= stepNum;
                        return (
                          <div key={step} className="flex flex-col items-center gap-2 z-10 relative">
                            <div
                              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                                isDone
                                  ? "bg-flipkartGreen border-flipkartGreen text-white shadow"
                                  : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-400"
                              }`}
                            >
                              {isDone ? <FaCheckCircle size={14} /> : stepNum}
                            </div>
                            <span className={`text-xs font-bold ${isDone ? "text-flipkartGreen" : "text-gray-400"}`}>
                              {step}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Order Products */}
                  <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Items ordered</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {order.products.map((item, index) => (
                        <div
                          key={index}
                          className="flex gap-4 p-4 border border-gray-50 dark:border-gray-800 rounded-sm bg-gray-50/55 dark:bg-gray-950/20"
                        >
                          <div className="w-16 h-16 flex-shrink-0 bg-white dark:bg-gray-950 border border-gray-100 dark:border-gray-800 p-1 flex items-center justify-center">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div>
                            <h4 className="text-xs md:text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">Category: {item.category}</p>
                            <p className="text-xs font-bold text-flipkartGreen mt-1.5">₹{item.price.toLocaleString("en-IN")}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Summary & Invoice download */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-t border-gray-100 dark:border-gray-800 pt-4">
                    <p className="text-lg md:text-xl font-black text-flipkartGreen">
                      Total Paid: ₹{order.totalPrice.toLocaleString("en-IN")}
                    </p>
                    <button
                      onClick={() => generateInvoice(order)}
                      className="bg-flipkartBlue hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 shadow transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
                    >
                      <span>Download Invoice</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 py-16 px-4 text-center max-w-2xl mx-auto flex flex-col items-center">
            <span className="text-8xl mb-4">📦</span>
            <h2 className="text-2xl font-black text-gray-800 dark:text-gray-200">No Orders Found!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm max-w-sm">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/"
              className="mt-6 bg-flipkartBlue text-white font-bold px-8 py-3 rounded-sm shadow hover:bg-blue-600 transition-all duration-200"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export default Orders;