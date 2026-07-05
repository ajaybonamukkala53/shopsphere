import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Navbar from "../components/Navbar";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector(
    (state) => state.cart
  );

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [pincode, setPincode] =
    useState("");

  const [coupon, setCoupon] =
    useState("");

  const [discount, setDiscount] =
    useState(0);

  // TOTAL PRICE

  const totalPrice =
    cartItems.reduce(
      (acc, item) =>
        acc + item.price,
      0
    );

  const finalTotal =
    totalPrice - discount;

  // APPLY COUPON

  const applyCoupon = () => {
    if (coupon === "WELCOME50") {
      setDiscount(50);

      alert(
        "WELCOME50 Applied ✅"
      );
    }

    else if (
      coupon === "SAVE10"
    ) {
      setDiscount(
        totalPrice * 0.10
      );

      alert(
        "SAVE10 Applied ✅"
      );
    }

    else if (
      coupon === "FREESHIP"
    ) {
      setDiscount(30);

      alert(
        "FREESHIP Applied ✅"
      );
    }

    else {
      setDiscount(0);

      alert(
        "Invalid Coupon ❌"
      );
    }
  };

  // PLACE ORDER

  const placeOrder = async () => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user) {
      alert("Please Login First");
      return;
    }

    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/payment/create-order`,
      {
        amount: finalTotal,
      }
    );

    const options = {
      key: "rzp_test_SuiC4XnCGvntxx",

      amount: data.amount,
      currency: data.currency,
      name: "ShopSphere",
      description: "Order Payment",
      order_id: data.id,

      handler: async function (response) {
        try {
          const deliveryOtp =
            Math.floor(
              1000 +
              Math.random() * 9000
            );

          await axios.post(
            "http://localhost:5000/api/orders",
            {
              products: cartItems,
              totalPrice: finalTotal,
              userEmail: user.email,
              paymentMethod: "Online",
              paymentStatus: "Paid",
              orderStatus: "Order Placed",
              deliveryOtp,
              razorpayPaymentId:
                response.razorpay_payment_id,
              coupon,
              discount,

              address: {
                name,
                phone,
                address,
                pincode,
              },
            }
          );

          alert(
            `Payment Successful ✅\n\nDelivery OTP: ${deliveryOtp}`
          );

          dispatch(clearCart());

          navigate("/payment-success");

        } catch (error) {
          console.log(error);
          alert("Order Creation Failed ❌");
        }
      },

      prefill: {
        name,
        email: user.email,
        contact: phone,
      },

      theme: {
        color: "#000000",
      },
    };

    if (!window.Razorpay) {
      alert("Razorpay SDK Not Loaded");
      return;
    }

    const razorpay =
      new window.Razorpay(options);

    razorpay.open();

  } catch (error) {
    console.log(error);
    alert("Payment Failed ❌");
  }
};

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-5xl mx-auto p-10">
        <div className="bg-white p-10 rounded-3xl shadow-xl">

          <h1 className="text-5xl font-bold mb-10">
            Checkout 💳
          </h1>

          {/* ADDRESS */}

          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded-2xl"
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded-2xl"
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) =>
                setAddress(
                  e.target.value
                )
              }
              rows="4"
              className="w-full p-4 border rounded-2xl"
            />

            <input
              type="text"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) =>
                setPincode(
                  e.target.value
                )
              }
              className="w-full p-4 border rounded-2xl"
            />

          </div>

          {/* PRODUCTS */}

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-6">
              Order Summary 📦
            </h2>

            <div className="space-y-5">

              {cartItems.map(
                (item) => (

                  <div
                    key={item._id}
                    className="flex items-center gap-5 border p-5 rounded-2xl"
                  >

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />

                    <div>

                      <h3 className="text-2xl font-bold">
                        {item.title}
                      </h3>

                      <p className="text-green-600 text-xl font-bold mt-2">
                        ₹
                        {item.price}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

          {/* COUPON */}

          <div className="mt-10">

            <h2 className="text-3xl font-bold mb-4">
              Coupon 🎟️
            </h2>

            <div className="flex gap-3">

              <input
                type="text"
                placeholder="Enter Coupon"
                value={coupon}
                onChange={(e) =>
                  setCoupon(
                    e.target.value
                  )
                }
                className="flex-1 p-4 border rounded-2xl"
              />

              <button
                onClick={applyCoupon}
                className="bg-green-600 text-white px-6 rounded-2xl"
              >
                Apply
              </button>

            </div>

          </div>

          {/* TOTALS */}

          <div className="mt-10">

            <h2 className="text-2xl font-bold">
              Original Total:
              ₹
              {totalPrice}
            </h2>

            <h2 className="text-2xl font-bold text-red-600 mt-2">
              Discount:
              ₹
              {discount}
            </h2>

            <h2 className="text-4xl font-bold text-green-600 mt-3">
              Final Total:
              ₹
              {finalTotal}
            </h2>

          </div>

          {/* ORDER BUTTON */}

          <button
  onClick={placeOrder}
  className="w-full bg-green-600 text-white py-5 rounded-2xl text-2xl font-bold mt-10 hover:bg-green-700 duration-300"
>
  Pay Now 💳
</button>

        </div>
      </div>
    </div>
  );
}

export default Checkout;