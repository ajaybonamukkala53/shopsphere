import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function Wishlist() {

  const [items, setItems] =
    useState([]);




  useEffect(() => {

    fetchWishlist();

  }, []);




  const fetchWishlist =
    async () => {

      try {

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            )

          );



        if (!user) {

          return;
        }



        const { data } =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/wishlist/${user.email}`

          );



        setItems(data);

      } catch (error) {

        console.log(error);

      }
    };




  const removeWishlist =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/wishlist/${id}`

        );



        fetchWishlist();

      } catch (error) {

        console.log(error);

      }
    };




  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />



      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">

          Wishlist ❤️

        </h1>



        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {

            items.length > 0

              ? (

                items.map(

                  (item) => (

                    <div

                      key={item._id}

                      className="bg-white p-5 rounded-3xl shadow-xl"

                    >

                      <img

                        src={item.image}

                        alt={item.title}

                        className="w-full h-64 object-cover rounded-2xl"

                      />



                      <h2 className="text-2xl font-bold mt-5">

                        {item.title}

                      </h2>



                      <p className="text-green-600 text-2xl font-bold mt-3">

                        ₹
                        {item.price}

                      </p>



                      <button

                        onClick={() =>
                          removeWishlist(
                            item._id
                          )
                        }

                        className="w-full bg-red-600 text-white py-4 rounded-2xl text-xl font-bold mt-6"

                      >

                        Remove ❌

                      </button>

                    </div>

                  )

                )

              )

              : (

                <h1 className="text-3xl font-bold">

                  Wishlist Empty ❌

                </h1>

              )

          }

        </div>

      </div>

    </div>
  );
}

export default Wishlist;