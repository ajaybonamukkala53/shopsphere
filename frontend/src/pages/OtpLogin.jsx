import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaEnvelope, FaKey } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function OtpLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter email address ❌");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/otp/send`, { email });
      alert("OTP Sent Successfully ✅");
      setShowOtpInput(true);
    } catch (error) {
      console.log(error);
      alert("Failed To Send OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      alert("Please enter OTP ❌");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API_URL}/api/otp/verify`, { email, otp });

      const user = JSON.parse(sessionStorage.getItem("pendingUser"));
      localStorage.setItem("user", JSON.stringify(user));
      sessionStorage.removeItem("pendingUser");

      alert("Login Successful ✅");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert("Invalid OTP ❌");
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
              <h2 className="text-2xl font-black italic">OTP Login</h2>
              <p className="text-xs text-white/80 mt-3 leading-relaxed">
                Login securely using a One-Time Password sent to your email.
              </p>
            </div>
            <span className="text-7xl opacity-10 self-center">🔐</span>
          </div>

          {/* Form panel */}
          <div className="p-8 flex-grow space-y-6">
            <h1 className="text-xl font-bold md:hidden">OTP Login</h1>
            
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
                    disabled={showOtpInput}
                    className="pl-9 pr-3 py-2.5 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full disabled:bg-gray-50 dark:disabled:bg-gray-800"
                    required
                  />
                </div>
              </div>

              {!showOtpInput ? (
                <button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full bg-flipkartOrange hover:bg-orange-600 text-white font-black uppercase text-xs tracking-wider py-3.5 shadow transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              ) : (
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500">One-Time Password (OTP)</label>
                    <div className="relative">
                      <FaKey className="absolute left-3 top-3 text-gray-400" size={14} />
                      <input
                        type="text"
                        placeholder="enter 4-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="pl-9 pr-3 py-2.5 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                        required
                      />
                    </div>
                  </div>

                  <button
                    onClick={verifyOtp}
                    disabled={loading}
                    className="w-full bg-flipkartGreen hover:bg-green-600 text-white font-black uppercase text-xs tracking-wider py-3.5 shadow transition-colors duration-200 cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    {loading ? "Verifying..." : "Verify OTP"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtpLogin;