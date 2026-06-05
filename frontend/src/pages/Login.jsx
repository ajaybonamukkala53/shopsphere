import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import { useDispatch } from "react-redux";

import { loadCart } from "../redux/cartSlice";

function Login() {

  const dispatch = useDispatch();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");



  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        const { data } =
          await axios.post(

            "http://localhost:5000/api/users/login",

            {
              email,
              password,
            }

          );


sessionStorage.setItem(
  "pendingUser",
  JSON.stringify(data)
);

await axios.post(
  "http://localhost:5000/api/otp/send",
  {
    email,
  }
);

alert(
  "OTP Sent To Your Email ✅"
);

window.location.href =
  "/otp-login";

      } catch (error) {

        console.log(error);



        alert(
          "Invalid Email or Password"
        );
      }
    };



  return (

    <div className="min-h-screen bg-gray-100">

      <Navbar />



      <div className="flex justify-center items-center h-[80vh]">

        <form

          onSubmit={submitHandler}

          className="bg-white p-10 rounded-xl shadow-lg w-[400px]"

        >

          <h1 className="text-4xl font-bold text-center mb-10">

            Login

          </h1>



          <input

            type="email"

            placeholder="Enter Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            className="w-full border p-3 rounded-lg mb-5"

            required

          />



          <input

            type="password"

            placeholder="Enter Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            className="w-full border p-3 rounded-lg mb-5"

            required

          />



          <button

            type="submit"

            className="bg-black text-white w-full py-3 rounded-lg"

          >

            Login

          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;