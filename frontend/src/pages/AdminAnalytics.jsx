import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import {
  Bar,
  Pie,
  Line,
} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function AdminAnalytics() {
  const [orders, setOrders] =
    useState([]);

  const [products, setProducts] =
    useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData =
    async () => {
      try {

        const orderRes =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/orders/admin/all`
          );

        const productRes =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products`
          );

        setOrders(
          orderRes.data
        );

        setProducts(
          productRes.data
        );

      } catch (error) {

        console.log(
          error
        );

      }
    };

  const totalRevenue =
    orders.reduce(
      (acc, order) =>
        acc +
        (order.totalPrice || 0),
      0
    );

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.orderStatus ===
        "Delivered"
    ).length;

  const pendingOrders =
    orders.filter(
      (order) =>
        order.orderStatus !==
        "Delivered"
    ).length;

  // BAR CHART

  const revenueChartData = {
    labels: [
      "Orders",
      "Revenue",
    ],

    datasets: [
      {
        label:
          "ShopSphere Analytics",

        data: [
          orders.length,
          totalRevenue,
        ],

        backgroundColor: [
          "#3B82F6",
          "#10B981",
        ],
      },
    ],
  };

  // PIE CHART

  const pieData = {
    labels: [
      "Delivered",
      "Pending",
    ],

    datasets: [
      {
        data: [
          deliveredOrders,
          pendingOrders,
        ],

        backgroundColor: [
          "#10B981",
          "#F59E0B",
        ],
      },
    ],
  };

  // MONTHLY SALES

  const monthlySales = {};

  orders.forEach(
    (order) => {

      const month =
        new Date(
          order.createdAt
        ).toLocaleString(
          "default",
          {
            month: "short",
          }
        );

      monthlySales[
        month
      ] =
        (
          monthlySales[
            month
          ] || 0
        ) +
        order.totalPrice;

    }
  );

  const lineData = {
    labels:
      Object.keys(
        monthlySales
      ),

    datasets: [
      {
        label:
          "Monthly Revenue",

        data:
          Object.values(
            monthlySales
          ),

        borderColor:
          "#3B82F6",

        backgroundColor:
          "#3B82F6",
      },
    ],
  };

  // TOP PRODUCTS

  const productSales = {};

  orders.forEach(
    (order) => {

      order.products?.forEach(
        (item) => {

          productSales[
            item.title
          ] =
            (
              productSales[
                item.title
              ] || 0
            ) +
            (
              item.quantity || 1
            );

        }
      );

    }
  );

  const topProducts =
    Object.entries(
      productSales
    )
      .sort(
        (a, b) =>
          b[1] - a[1]
      )
      .slice(0, 5);

  return (
    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">
          Admin Analytics 📊
        </h1>

        {/* CARDS */}

        <div className="grid md:grid-cols-5 gap-6">

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold">
              Total Orders
            </h2>

            <h1 className="text-5xl mt-3 font-bold">
              {orders.length}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold">
              Revenue
            </h2>

            <h1 className="text-5xl mt-3 font-bold text-green-600">
              ₹{totalRevenue}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold">
              Products
            </h2>

            <h1 className="text-5xl mt-3 font-bold">
              {products.length}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold">
              Pending
            </h2>

            <h1 className="text-5xl mt-3 font-bold text-orange-500">
              {pendingOrders}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">
            <h2 className="text-xl font-bold">
              Delivered
            </h2>

            <h1 className="text-5xl mt-3 font-bold text-blue-600">
              {deliveredOrders}
            </h1>
          </div>

        </div>

        {/* CHARTS */}

        <div className="grid md:grid-cols-2 gap-8 mt-10">

          <div className="bg-white p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold mb-5">
              Revenue Analytics 📈
            </h2>

            <Bar
              data={
                revenueChartData
              }
            />

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl">

            <h2 className="text-2xl font-bold mb-5">
              Orders Status 🥧
            </h2>

            <Pie
              data={pieData}
            />

          </div>

        </div>

        {/* MONTHLY REVENUE */}

        <div className="bg-white p-6 rounded-3xl shadow-xl mt-10">

          <h2 className="text-3xl font-bold mb-5">
            Monthly Revenue 📊
          </h2>

          <Line
            data={lineData}
          />

        </div>

        {/* TOP PRODUCTS */}

        <div className="bg-white p-6 rounded-3xl shadow-xl mt-10">

          <h2 className="text-3xl font-bold mb-5">
            Top Selling Products 🔥
          </h2>

          {
            topProducts.map(
              ([title, sold]) => (

                <div
                  key={title}
                  className="flex justify-between border-b py-3"
                >

                  <span>
                    {title}
                  </span>

                  <span>
                    {sold} Sold
                  </span>

                </div>

              )
            )
          }

        </div>

        {/* RECENT ORDERS */}

        <div className="bg-white p-6 rounded-3xl shadow-xl mt-10 overflow-x-auto">

          <h2 className="text-3xl font-bold mb-5">
            Recent Orders 📦
          </h2>

          <table className="w-full">

            <thead>

              <tr className="border-b">

                <th className="p-3">
                  Email
                </th>

                <th className="p-3">
                  Total
                </th>

                <th className="p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {
                orders
                  .slice(0, 10)
                  .map(
                    (order) => (

                      <tr
                        key={
                          order._id
                        }
                        className="border-b"
                      >

                        <td className="p-3">
                          {
                            order.userEmail
                          }
                        </td>

                        <td className="p-3">
                          ₹
                          {
                            order.totalPrice
                          }
                        </td>

                        <td className="p-3">
                          {
                            order.orderStatus
                          }
                        </td>

                      </tr>

                    )
                  )
              }

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default AdminAnalytics;