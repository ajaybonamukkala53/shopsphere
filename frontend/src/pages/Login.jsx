import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        { email, password }
      );

      sessionStorage.setItem("pendingUser", JSON.stringify(data));

      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/otp/send`,
        { email }
      );

      alert("OTP Sent To Your Email ✅");
      navigate("/otp-login");
    } catch (error) {
      console.log(error);
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-flipkartBg dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="flex justify-center items-center h-[80vh] px-4">
        <div className="bg-white dark:bg-gray-900 rounded-sm shadow-md border border-gray-100 dark:border-gray-800 w-full max-w-md overflow-hidden flex flex-col md:flex-row">
          
          {/* Left panel (brand detail) */}
          <div className="bg-flipkartBlue text-white p-8 md:w-2/5 flex flex-col justify-between hidden md:flex">
            <div>
              <h2 className="text-2xl font-black italic">Login</h2>
              <p className="text-xs text-white/80 mt-3 leading-relaxed">
                Get access to your Orders, Wishlist and Recommendations
              </p>
            </div>
            <span className="text-7xl opacity-10 self-center">🛍️</span>
          </div>

          {/* Form panel */}
          <form onSubmit={submitHandler} className="p-8 flex-grow space-y-6">
            <h1 className="text-xl font-bold md:hidden">Login</h1>
            
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500">Email Address</label>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-3 text-gray-400" size={14} />
                  <input
                    type="email"
                    placeholder="enter email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 pr-3 py-2.5 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-bold text-gray-500">Password</label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-3 text-gray-400" size={14} />
                  <input
                    type="password"
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 pr-3 py-2.5 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-flipkartOrange hover:bg-orange-600 text-white font-black uppercase text-xs tracking-wider py-3.5 shadow transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
            >
              {loading ? "Sending OTP..." : "Request OTP"}
            </button>

            <div className="text-center text-xs font-semibold text-gray-500">
              New to ShopSphere?{" "}
              <Link to="/register" className="text-flipkartBlue hover:underline">
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;