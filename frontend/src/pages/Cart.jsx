import {
  useSelector,
  useDispatch,
} from "react-redux";

import {
  removeFromCart,
} from "../redux/cartSlice";

import Navbar from "../components/Navbar";

import {
  Link,
} from "react-router-dom";

function Cart() {

  const dispatch =
    useDispatch();

  const { cartItems } =
    useSelector(

      (state) => state.cart

    );



  const totalPrice =
    cartItems.reduce(

      (acc, item) =>

        acc +
        item.price,

      0

    );



  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />



      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">

          Shopping Cart 🛒

        </h1>



        <div className="space-y-6">

          {

            cartItems.length > 0

              ? (

                cartItems.map(

                  (item) => (

                    <div

                      key={item._id}

                      className="bg-white p-5 rounded-3xl shadow-xl flex items-center justify-between"

                    >

                      <div className="flex items-center gap-5">

                        <img

                          src={item.image}

                          alt={item.title}

                          className="w-24 h-24 object-cover rounded-2xl"

                        />



                        <div>

                          <h2 className="text-2xl font-bold">

                            {item.title}

                          </h2>



                          <p className="text-green-600 text-xl font-bold mt-2">

                            ₹
                            {item.price}

                          </p>

                        </div>

                      </div>



                      <button

                        onClick={() =>
                          dispatch(

                            removeFromCart(

                              item._id

                            )

                          )
                        }

                        className="bg-red-600 text-white px-6 py-3 rounded-2xl"

                      >

                        Remove ❌

                      </button>

                    </div>

                  )

                )

              )

              : (

                <h1 className="text-3xl font-bold">

                  Cart Is Empty ❌

                </h1>

              )

          }

        </div>



        {/* TOTAL */}

        <div className="mt-10 bg-white p-8 rounded-3xl shadow-xl">

          <h2 className="text-4xl font-bold text-green-600">

            Total:
            {" "}
            ₹
            {totalPrice}

          </h2>



          <Link

            to="/checkout"

            className="block mt-8 bg-black text-white text-center py-5 rounded-2xl text-2xl font-bold"

          >

            Proceed To Checkout 🚀

          </Link>

        </div>

      </div>

    </div>

  );
}

export default Cart;