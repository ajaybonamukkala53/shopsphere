import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

import generateInvoice from "../utils/generateInvoice";

function Orders() {

  const [orders, setOrders] =
    useState([]);




  useEffect(() => {

    fetchOrders();

  }, []);




  // FETCH ORDERS

  const fetchOrders =
    async () => {

      try {

        const user =
          JSON.parse(

            localStorage.getItem(
              "user"
            )

          );




        if (!user) {

          alert(
            "Please Login First"
          );

          return;
        }




        const { data } =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/orders/${user.email}`

          );




        setOrders(data);

      } catch (error) {

        console.log(error);

      }
    };




  // TRACKING STEP

  const getTrackingStep =
    (status) => {

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




  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />




      <div className="max-w-6xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">

          My Orders 📦

        </h1>




        <div className="space-y-10">

          {

            orders.length > 0

              ? (

                orders.map(

                  (order) => {

                    const step =
                      getTrackingStep(

                        order.orderStatus

                      );




                    return (

                      <div

                        key={order._id}

                        className="bg-white p-8 rounded-3xl shadow-xl"

                      >

                        {/* ORDER ID */}

                        <h2 className="text-2xl font-bold mb-5">

                          Order ID:
                          {" "}
                          {order._id}

                        </h2>




                        {/* PAYMENT STATUS */}

                        <p className="text-xl mb-3">

                          Payment:
                          {" "}

                          <span className="text-green-600 font-bold">

                            {

                              order.paymentStatus

                            }

                          </span>

                        </p>




                        {/* ORDER STATUS */}

                        <p className="text-xl mb-3">

                          Status:
                          {" "}

                          <span className="text-blue-600 font-bold">

                            {

                              order.orderStatus

                            }

                          </span>

                        </p>




                        {/* DELIVERY OTP */}

                        <p className="text-xl mb-6">

                          Delivery OTP:
                          {" "}

                          <span className="font-bold text-red-600">

                            {

                              order.deliveryOtp

                            }

                          </span>

                        </p>




                        {/* TRACKING */}

                        <div className="flex justify-between items-center mb-10">

                          {

                            [

                              "Order Placed",

                              "Packed",

                              "Shipped",

                              "Out For Delivery",

                              "Delivered",

                            ].map(

                              (

                                item,
                                index

                              ) => (

                                <div

                                  key={index}

                                  className="flex flex-col items-center"

                                >

                                  <div

                                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold

                                    ${

                                      step >=
                                      index + 1

                                        ? "bg-green-600"

                                        : "bg-gray-300"

                                    }`}

                                  >

                                    {

                                      index + 1

                                    }

                                  </div>




                                  <p className="text-sm mt-2 text-center">

                                    {item}

                                  </p>

                                </div>

                              )

                            )

                          }

                        </div>




                        {/* PRODUCTS */}

                        <div className="space-y-5">

                          {

                            order.products.map(

                              (

                                item,
                                index

                              ) => (

                                <div

                                  key={index}

                                  className="flex items-center gap-5 border p-5 rounded-2xl"

                                >

                                  <img

                                    src={item.image}

                                    alt={item.title}

                                    className="w-24 h-24 object-cover rounded-2xl"

                                  />




                                  <div>

                                    <h3 className="text-2xl font-bold">

                                      {

                                        item.title

                                      }

                                    </h3>




                                    <p className="text-xl text-green-600 font-bold mt-2">

                                      ₹
                                      {

                                        item.price

                                      }

                                    </p>

                                  </div>

                                </div>

                              )

                            )

                          }

                        </div>




                        {/* TOTAL */}

                        <p className="text-3xl font-bold text-green-600 mt-8">

                          Total:
                          {" "}
                          ₹
                          {

                            order.totalPrice

                          }

                        </p>




                        {/* DOWNLOAD INVOICE */}

                        <button

                          onClick={() =>
                            generateInvoice(order)
                          }

                          className="bg-black text-white px-6 py-4 rounded-2xl mt-8 text-xl font-bold hover:bg-gray-800 duration-300"

                        >

                          Download Invoice 📄

                        </button>

                      </div>

                    );
                  }

                )

              )

              : (

                <h1 className="text-3xl font-bold">

                  No Orders Found ❌

                </h1>

              )

          }

        </div>

      </div>

    </div>
  );
}

export default Orders;