import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/orders/admin/all"
      );

      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `http://localhost:5000/api/orders/status/${id}`,
        {
          status,
        }
      );
      const updateStatus = async (
  id,
  status
) => {

  try {

    console.log(
      "ID:",
      id
    );

    console.log(
      "STATUS:",
      status
    );

    const res =
      await axios.put(

        `http://localhost:5000/api/orders/status/${id}`,

        {
          status,
        }

      );

    console.log(
      res.data
    );

    fetchOrders();

  } catch (error) {

    console.log(
      error.response?.data
    );

    console.log(error);

    alert(
      "Update Failed ❌"
    );

  }

};

      fetchOrders();

      alert(
        "Status Updated ✅"
      );
    } catch (error) {
      console.log(error);

      alert(
        "Update Failed ❌"
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">
        <h1 className="text-5xl font-bold mb-10">
          Admin Orders 📦
        </h1>

        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-8 rounded-3xl shadow-xl mb-8"
            >
              <h2 className="text-2xl font-bold">
                Order ID:
                {" "}
                {order._id}
              </h2>

              <p className="mt-2">
                User:
                {" "}
                {order.userEmail}
              </p>

              <p className="mt-2">
                Total:
                {" "}
                ₹
                {order.totalPrice}
              </p>

              <p className="mt-2">
                Payment:
                {" "}
                {order.paymentStatus}
              </p>

              <p className="mt-2">
                Delivery OTP:
                {" "}
                {order.deliveryOtp}
              </p>

              <div className="mt-5">
                <label className="font-bold">
                  Update Status
                </label>

                <select
                  value={order.orderStatus}
                  onChange={(e) =>
                    updateStatus(
                      order._id,
                      e.target.value
                    )
                  }
                  className="w-full p-4 border rounded-2xl mt-3"
                >
                  <option>
                    Order Placed
                  </option>

                  <option>
                    Packed
                  </option>

                  <option>
                    Shipped
                  </option>

                  <option>
                    Out For Delivery
                  </option>

                  <option>
                    Delivered
                  </option>
                </select>
              </div>

              <div className="mt-5">
                {order.products.map(
                  (
                    product,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex gap-4 border p-4 rounded-2xl mb-3"
                    >
                      <img
                        src={
                          product.image
                        }
                        alt={
                          product.title
                        }
                        className="w-20 h-20 rounded-xl object-cover"
                      />

                      <div>
                        <h3 className="font-bold">
                          {
                            product.title
                          }
                        </h3>

                        <p>
                          ₹
                          {
                            product.price
                          }
                        </p>

                        <p>
                          Qty:
                          {
                            product.quantity
                          }
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
          ))
        ) : (
          <h1 className="text-3xl font-bold">
            No Orders Found ❌
          </h1>
        )}
      </div>
    </div>
  );
}

export default AdminOrders;