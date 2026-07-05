import { useState } from "react";

import axios from "axios";

import { useNavigate } from "react-router-dom";



function OtpLogin() {

  const navigate =
    useNavigate();

  const [email, setEmail] =
    useState("");

  const [otp, setOtp] =
    useState("");

  const [generatedOtp, setGeneratedOtp] =
    useState("");

  const [showOtpInput, setShowOtpInput] =
    useState(false);



  // SEND OTP

  const sendOtp =
    async () => {

      try {

        const { data } =
          await axios.post(

            `${import.meta.env.VITE_API_URL}/api/otp/send`,

            {

              email,

            }

          );



        alert(
          "OTP Sent Successfully ✅"
        );



        setGeneratedOtp(
          String(data.otp)
        );



        setShowOtpInput(
          true
        );

      } catch (error) {

        console.log(error);



        alert(
          "Failed To Send OTP ❌"
        );
      }
    };



  // VERIFY OTP

  const verifyOtp =
  async () => {

    try {

      await axios.post(
        "http://localhost:5000/api/otp/verify",
        {
          email,
          otp,
        }
      );

      const user =
        JSON.parse(
          sessionStorage.getItem(
            "pendingUser"
          )
        );

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      sessionStorage.removeItem(
        "pendingUser"
      );

      alert(
        "Login Successful ✅"
      );

      navigate("/");

    } catch (error) {

      alert(
        "Invalid OTP ❌"
      );

    }
  };



  return (

    <div className="min-h-screen flex justify-center items-center bg-gray-100">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[450px]">

        <h1 className="text-4xl font-bold mb-8 text-center">

          OTP Login 🔐

        </h1>



        {/* EMAIL */}

        <input

          type="email"

          placeholder="Enter Email"

          value={email}

          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }

          className="w-full p-4 border rounded-2xl mb-5"

        />



        {/* SEND OTP */}

        <button

          onClick={sendOtp}

          className="w-full bg-black text-white py-4 rounded-2xl text-xl font-bold"

        >

          Send OTP

        </button>



        {

          showOtpInput && (

            <div className="mt-6">

              {/* OTP INPUT */}

              <input

                type="text"

                placeholder="Enter OTP"

                value={otp}

                onChange={(e) =>
                  setOtp(
                    e.target.value
                  )
                }

                className="w-full p-4 border rounded-2xl mb-5"

              />



              {/* VERIFY BUTTON */}

              <button

                onClick={verifyOtp}

                className="w-full bg-green-600 text-white py-4 rounded-2xl text-xl font-bold"

              >

                Verify OTP

              </button>

            </div>

          )

        }

      </div>

    </div>
  );
}

export default OtpLogin;