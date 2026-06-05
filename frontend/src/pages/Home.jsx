
import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] =
    useState([]);

  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {
      try {
        const { data } = await axios.get(
  `${import.meta.env.VITE_API_URL}/api/products`
);

        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error);
      }
    };

  useEffect(() => {
    let updated = [...products];

    if (search) {
      updated = updated.filter(
        (item) =>
          item.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            )
      );
    }

    if (category) {
      updated = updated.filter(
        (item) =>
          item.category ===
          category
      );
    }

    setFilteredProducts(updated);
  }, [
    search,
    category,
    products,
  ]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <div className="max-w-7xl mx-auto p-6">

        {/* HERO SECTION */}

        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-3xl p-10 mb-10">
          <h1 className="text-6xl font-bold">
            ShopSphere 🛍️
          </h1>

          <p className="text-2xl mt-4">
            Discover Amazing Products At Best Prices
          </p>
        </div>

        {/* PRODUCT COUNT */}

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-black dark:text-white">
            Trending Products 🔥
          </h1>

          <h2 className="text-2xl font-bold text-blue-600">
            {filteredProducts.length} Products
          </h2>
        </div>

        {/* CATEGORY BUTTONS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">

          <button
            onClick={() =>
              setCategory("")
            }
            className="bg-white text-black dark:bg-gray-800 dark:text-white p-5 rounded-2xl shadow-lg font-bold hover:scale-105 duration-300"
          >
            All Products
          </button>

          <button
            onClick={() =>
              setCategory(
                "Electronics"
              )
            }
            className="bg-white text-black dark:bg-gray-800 dark:text-white p-5 rounded-2xl shadow-lg font-bold hover:scale-105 duration-300"
          >
            Electronics
          </button>

          <button
            onClick={() =>
              setCategory(
                "Fashion"
              )
            }
            className="bg-white text-black dark:bg-gray-800 dark:text-white p-5 rounded-2xl shadow-lg font-bold hover:scale-105 duration-300"
          >
            Fashion
          </button>

          <button
            onClick={() =>
              setCategory(
                "Mobiles"
              )
            }
            className="bg-white text-black dark:bg-gray-800 dark:text-white p-5 rounded-2xl shadow-lg font-bold hover:scale-105 duration-300"
          >
            Mobiles
          </button>

        </div>

        {/* SEARCH + FILTER */}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-xl mb-10">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input
              type="text"
              placeholder="Search Products..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="p-4 border rounded-2xl bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="p-4 border rounded-2xl bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
            >
              <option value="">
                All Categories
              </option>

              <option value="Electronics">
                Electronics
              </option>

              <option value="Fashion">
                Fashion
              </option>

              <option value="Shoes">
                Shoes
              </option>

              <option value="Mobiles">
                Mobiles
              </option>
            </select>

          </div>

        </div>

        {/* ALL PRODUCTS */}

        <h2 className="text-4xl font-bold mb-6 text-black dark:text-white">
          🛒 All Products
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {filteredProducts.length > 0 ? (
            filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                />
              )
            )
          ) : (
            <h1 className="text-3xl font-bold text-black dark:text-white">
              No Products Found ❌
            </h1>
          )}

        </div>

        {/* FOOTER */}

        <div className="text-center py-10 mt-20 border-t border-gray-300 dark:border-gray-700">

          <h2 className="text-2xl font-bold">
            ShopSphere © 2026
          </h2>

          <p className="text-gray-500 dark:text-gray-400 mt-2">
            MERN E-Commerce Platform
          </p>

        </div>

      </div>
    </div>
  );
}

export default Home;

