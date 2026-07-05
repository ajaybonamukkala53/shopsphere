import { useState } from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import { useDispatch } from "react-redux";

import { loadCart } from "../redux/cartSlice";

function Register() {

  const dispatch = useDispatch();

  const [name, setName] =
    useState("");

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

            `${import.meta.env.VITE_API_URL}/api/users/register`,

            {
              name,
              email,
              password,
            }

          );



        localStorage.setItem(
          "user",
          JSON.stringify({
          _id: data._id,
          name: data.name,
          email: data.email,
          role: data.role,
          token: data.token,
          })
          );


        dispatch(loadCart());



        alert(
          "Registration Successful"
        );



        window.location.href =
          "/";

      } catch (error) {

        console.log(error);



        alert(
          "Registration Failed"
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

            Register

          </h1>



          <input

            type="text"

            placeholder="Enter Name"

            value={name}

            onChange={(e) =>
              setName(e.target.value)
            }

            className="w-full border p-3 rounded-lg mb-5"

            required

          />



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

            Register

          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;