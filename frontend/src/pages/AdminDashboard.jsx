import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function AdminDashboard() {
  const [products, setProducts] =
    useState([]);

  const [orders, setOrders] =
    useState([]);

  const fetchProducts =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/products`
          );

        setProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

  const fetchOrders =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${import.meta.env.VITE_API_URL}/api/orders/admin/all`
          );

        setOrders(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    fetchProducts();
    fetchOrders();
  }, []);

  const deleteProduct =
    async (id) => {
      try {
        await axios.delete(
          `http://localhost:5000/api/products/${id}`
        );

        alert(
          "Product Deleted Successfully"
        );

        fetchProducts();
      } catch (error) {
        console.log(error);
      }
    };

  const totalProducts =
    products.length;

  const totalOrders =
    orders.length;

  const totalRevenue =
    orders.reduce(
      (total, order) =>
        total +
        (order.totalPrice || 0),
      0
    );

  const outOfStockProducts =
    products.filter(
      (product) =>
        product.stock === 0
    ).length;

  const lowStockProducts =
    products.filter(
      (product) =>
        product.stock > 0 &&
        product.stock <=
          (product.lowStockAlert || 5)
    ).length;

  const chartData = {
    labels: [
      "Products",
      "Orders",
      "Out Of Stock",
      "Low Stock",
    ],
    datasets: [
      {
        label:
          "ShopSphere Analytics",
        data: [
          totalProducts,
          totalOrders,
          outOfStockProducts,
          lowStockProducts,
        ],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#EF4444",
          "#F59E0B",
        ],
      },
    ],
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-5xl font-bold text-center mb-10">
          Admin Dashboard 📊
        </h1>

        {/* ANALYTICS CARDS */}

        <div className="grid md:grid-cols-5 gap-6 mb-10">

          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h2 className="font-bold text-xl">
              📦 Products
            </h2>

            <h1 className="text-4xl font-bold mt-3">
              {totalProducts}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h2 className="font-bold text-xl">
              🛒 Orders
            </h2>

            <h1 className="text-4xl font-bold mt-3">
              {totalOrders}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h2 className="font-bold text-xl">
              💰 Revenue
            </h2>

            <h1 className="text-3xl font-bold text-green-600 mt-3">
              ₹{totalRevenue}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h2 className="font-bold text-xl">
              ❌ Out Of Stock
            </h2>

            <h1 className="text-4xl font-bold text-red-600 mt-3">
              {outOfStockProducts}
            </h1>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-xl text-center">
            <h2 className="font-bold text-xl">
              ⚠️ Low Stock
            </h2>

            <h1 className="text-4xl font-bold text-orange-500 mt-3">
              {lowStockProducts}
            </h1>
          </div>

        </div>

        {/* BAR CHART */}

        <div className="bg-white p-6 rounded-3xl shadow-xl mb-12">
          <Bar data={chartData} />
        </div>

        {/* PRODUCT LIST */}

        <div className="grid md:grid-cols-3 gap-10">

          {products.map(
            (product) => (

              <div
                key={product._id}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >

                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-64 object-cover"
                />

                <div className="p-5">

                  <h2 className="text-2xl font-bold">
                    {product.title}
                  </h2>

                  <h3 className="text-green-600 text-xl font-bold mt-2">
                    ₹{product.price}
                  </h3>

                  <p className="mt-2">
                    {product.category}
                  </p>

                  <p className="mt-2">
                    Rating: {product.rating}
                  </p>

                  <p className="font-bold mt-2">
                    Stock:
                    {" "}
                    {product.stock}
                  </p>

                  {product.stock === 0 ? (
                    <p className="text-red-600 font-bold">
                      Out Of Stock ❌
                    </p>
                  ) : product.stock <=
                    (product.lowStockAlert || 5) ? (
                    <p className="text-orange-500 font-bold">
                      Low Stock ⚠️
                    </p>
                  ) : (
                    <p className="text-green-600 font-bold">
                      In Stock ✅
                    </p>
                  )}

                  <div className="flex gap-3 mt-5">

                    <Link
                      to="/admin"
                    >
                      <button className="bg-blue-500 text-white px-5 py-3 rounded-xl">
                        Manage
                      </button>
                    </Link>

                    <button
                      onClick={() =>
                        deleteProduct(
                          product._id
                        )
                      }
                      className="bg-red-500 text-white px-5 py-3 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </div>
    </div>
  );
}

export default AdminDashboard;