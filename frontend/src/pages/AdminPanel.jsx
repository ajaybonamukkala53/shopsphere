import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import Navbar from "../components/Navbar";

function AdminPanel() {

  const [products, setProducts] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [image, setImage] =
    useState("");
  const [video, setVideo] =
  useState("");
  const [uploading, setUploading] =
    useState(false);

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [stock, setStock] =
    useState(10);

  const [
    lowStockAlert,
    setLowStockAlert,
  ] = useState(5);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts =
    async () => {

      try {

        const { data } =
          await axios.get(
            "http://localhost:5000/api/products"
          );

        setProducts(data);

      } catch (error) {

        console.log(error);

      }

    };

  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        if (editingId) {

          await axios.put(
  `http://localhost:5000/api/products/${editingId}`,
  {
    title,
    description,
    image,
    video,
    price,
    category,
    rating,
    stock,
    lowStockAlert,
  }
);

          alert(
            "Product Updated ✅"
          );

        } else {

          await axios.post(
  "http://localhost:5000/api/products",
  {
    title,
    description,
    image,
    video,
    price,
    category,
    rating,
    stock,
    lowStockAlert,
  }
);
          alert(
            "Product Added ✅"
          );

        }

        clearForm();

        fetchProducts();

      } catch (error) {

        console.log(error);

        alert(
          "Operation Failed ❌"
        );

      }

    };
    const uploadImage =
  async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    try {

      setUploading(true);

      const { data } =
        await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

      setImage(
  data.url
);

      alert(
        "Image Uploaded Successfully ✅"
      );

    } catch (error) {

      console.log(error);

      alert(
        "Image Upload Failed ❌"
      );

    } finally {

      setUploading(false);

    }

  };
  const uploadVideo =
  async (e) => {

    const file =
      e.target.files[0];

    if (!file) return;

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    try {

      setUploading(true);

      const { data } =
        await axios.post(
          "http://localhost:5000/api/upload",
          formData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

     setVideo(data.url);

console.log("New Video:", data.url);

alert("Video Uploaded Successfully ✅");

      
    } catch (error) {

      console.log(error);

      alert(
        "Video Upload Failed ❌"
      );

    } finally {

      setUploading(false);

    }

  };

  const deleteProduct =
    async (id) => {

      try {

        await axios.delete(

          `http://localhost:5000/api/products/${id}`

        );

        alert(
          "Product Deleted"
        );

        fetchProducts();

      } catch (error) {

        console.log(error);

      }

    };

  const editProduct =
    (product) => {

      setEditingId(
        product._id
      );

      setTitle(
        product.title
      );

      setDescription(
        product.description
      );

      setImage(
        product.image
      );
      setVideo(product.video || "");

      setPrice(
        product.price
      );

      setCategory(
        product.category
      );


      setRating(
        product.rating || 5
      );

      setStock(
        product.stock || 10
      );

      setLowStockAlert(
        product.lowStockAlert || 5
      );

    };

  const clearForm =
    () => {

      setEditingId(null);

      setTitle("");

      setDescription("");

      setImage("");
      setVideo("");

      setPrice("");

      setCategory("");

      setRating(5);

      setStock(10);

      setLowStockAlert(5);

    };

  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />

      <div className="max-w-7xl mx-auto p-10">

        <h1 className="text-5xl font-bold mb-10">

          Admin Panel 👨‍💻

        </h1>

        <form

          onSubmit={submitHandler}

          className="bg-white p-10 rounded-3xl shadow-xl mb-16"

        >

          <h2 className="text-3xl font-bold mb-8">

            {
              editingId
                ? "Edit Product"
                : "Add Product"
            }

          </h2>

          <input
                type="text"
                placeholder="Title"
                value={title}
                className="w-full p-4 border rounded-2xl mb-5"
                onChange={(e) =>
                  setTitle(
                    e.target.value
                  )
                }
                required
              />

              <textarea
                placeholder="Description"
                value={description}
                className="w-full p-4 border rounded-2xl mb-5"
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              <input
      type="file"
      accept="image/*"
      onChange={uploadImage}
      className="w-full p-4 border rounded-2xl mb-5"
    />

    {
      uploading && (
        <p className="text-blue-500 mb-4">
          Uploading...
        </p>
      )
    }

    {
      image && (
        <img
          src={image}
          alt="Preview"
          className="w-40 h-40 object-cover rounded-xl mb-5"
        />
      )
    }
    <input
  type="file"
  accept="video/*"
  onChange={uploadVideo}
  className="w-full p-4 border rounded-2xl mb-5"
/>
{
  video && (
    <video
      controls
      className="w-64 rounded-xl mb-5"
    >
      <source
        src={`${video}?v=${Date.now()}`}
        type="video/mp4"
      />
    </video>
  )
}

          <input
            type="number"
            placeholder="Price"
            value={price}
            className="w-full p-4 border rounded-2xl mb-5"
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            className="w-full p-4 border rounded-2xl mb-5"
            onChange={(e) =>
              setCategory(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Rating"
            value={rating}
            className="w-full p-4 border rounded-2xl mb-5"
            onChange={(e) =>
              setRating(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            className="w-full p-4 border rounded-2xl mb-5"
            onChange={(e) =>
              setStock(
                e.target.value
              )
            }
          />

          <input
            type="number"
            placeholder="Low Stock Alert"
            value={lowStockAlert}
            className="w-full p-4 border rounded-2xl mb-5"
            onChange={(e) =>
              setLowStockAlert(
                e.target.value
              )
            }
          />

          <div className="flex gap-5">

            <button
              type="submit"
              className="bg-black text-white px-10 py-4 rounded-2xl text-xl"
            >

              {
                editingId
                  ? "Update Product"
                  : "Add Product"
              }

            </button>

            {
              editingId && (

                <button

                  type="button"

                  onClick={
                    clearForm
                  }

                  className="bg-gray-500 text-white px-10 py-4 rounded-2xl text-xl"

                >

                  Cancel

                </button>

              )
            }

          </div>

        </form>

        <div className="grid md:grid-cols-3 gap-10">

          {
            products.map(
              (product) => (

                <div

                  key={
                    product._id
                  }

                  className="bg-white rounded-3xl shadow-xl overflow-hidden"

                >

                  {
  product.video ? (
    <video
      controls
      className="w-full h-64 object-cover"
    >
      <source
        src={product.video}
        type="video/mp4"
      />
    </video>
  ) : (
    <img
      src={product.image}
      alt=""
      className="w-full h-64 object-cover"
    />
  )
}

                  <div className="p-5">

                    <h2 className="text-2xl font-bold mb-2">

                      {product.title}

                    </h2>

                    <p>

                      ₹{product.price}

                    </p>

                    <p>

                      Rating:
                      {" "}
                      {product.rating}

                    </p>

                    <p className="font-bold">

                      Stock:
                      {" "}
                      {product.stock}

                    </p>

                    <p className="text-orange-500">

                      Alert:
                      {" "}
                      {product.lowStockAlert}

                    </p>

                    <div className="flex gap-3 mt-4">

                      <button

                        onClick={() =>
                          editProduct(
                            product
                          )
                        }

                        className="bg-blue-500 text-white px-5 py-3 rounded-xl"

                      >

                        Edit

                      </button>

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
            )
          }

        </div>

      </div>

    </div>

  );

}

export default AdminPanel;