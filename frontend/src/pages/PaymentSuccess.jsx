import {
  Link,
} from "react-router-dom";

import Navbar from "../components/Navbar";

function PaymentSuccess() {

  const deliveryDate =
    new Date();




  deliveryDate.setDate(

    deliveryDate.getDate() + 5

  );




  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />




      <div className="flex justify-center items-center py-20">

        <div className="bg-white p-12 rounded-3xl shadow-2xl w-[700px] text-center">

          <div className="text-8xl mb-6">

            ✅

          </div>




          <h1 className="text-5xl font-bold text-green-600 mb-6">

            Payment Successful

          </h1>




          <p className="text-2xl text-gray-600 mb-8">

            Your order has been confirmed.

          </p>




          {/* DELIVERY DATE */}

          <div className="bg-gray-100 p-6 rounded-2xl mb-8">

            <h2 className="text-3xl font-bold mb-4">

              Expected Delivery 🚚

            </h2>




            <p className="text-2xl text-blue-500 font-bold">

              {
                deliveryDate.toDateString()
              }

            </p>

          </div>




          {/* INVOICE */}

          <div className="bg-gray-100 p-6 rounded-2xl mb-8 text-left">

            <h2 className="text-3xl font-bold mb-5">

              Invoice 💳

            </h2>




            <div className="space-y-3 text-xl">

              <p>

                Order ID:
                {" "}
                #
                {
                  Math.floor(

                    Math.random() *
                    1000000

                  )
                }

              </p>




              <p>

                Payment Status:
                {" "}

                <span className="text-green-600 font-bold">

                  Paid

                </span>

              </p>




              <p>

                Delivery:
                {" "}

                Standard Delivery

              </p>

            </div>

          </div>




          <div className="flex justify-center gap-6">

            <Link to="/orders">

              <button className="bg-black text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-gray-800 duration-300">

                View Orders

              </button>

            </Link>




            <Link to="/">

              <button className="bg-pink-500 text-white px-8 py-4 rounded-2xl text-xl font-bold hover:bg-pink-600 duration-300">

                Continue Shopping

              </button>

            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default PaymentSuccess;