import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FaEdit, FaUpload, FaChevronLeft } from "react-icons/fa";

const API_URL = import.meta.env.VITE_API_URL;

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(5);
  const [stock, setStock] = useState(10);
  const [lowStockAlert, setLowStockAlert] = useState(5);
  const [status, setStatus] = useState("active");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API_URL}/api/products/${id}`);
        setTitle(data.title || "");
        setPrice(data.price || "");
        setImage(data.image || "");
        setVideo(data.video || "");
        setDescription(data.description || "");
        setCategory(data.category || "");
        setRating(data.rating ?? 5);
        setStock(data.stock ?? 10);
        setLowStockAlert(data.lowStockAlert ?? 5);
        setStatus(data.status || "active");
      } catch (error) {
        console.log(error);
        alert("Failed to load product data ❌");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const uploadFile = async (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (type === "image") {
        setImage(data.url);
        alert("Image Uploaded Successfully ✅");
      } else {
        setVideo(data.url);
        alert("Video Uploaded Successfully ✅");
      }
    } catch (error) {
      console.log(error);
      alert(`${type === "image" ? "Image" : "Video"} Upload Failed ❌`);
    } finally {
      setUploading(false);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/products/${id}`, {
        title,
        price: Number(price),
        image,
        video,
        description,
        category,
        rating: Number(rating),
        stock: Number(stock),
        lowStockAlert: Number(lowStockAlert),
        status,
      });

      alert("Product Updated Successfully ✅");
      navigate("/admin-dashboard");
    } catch (error) {
      console.log(error);
      alert("Failed to update product ❌");
    }
  };

  if (loading) {
    return (
      <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
        <Navbar />
        <div className="flex items-center justify-center h-[70vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-flipkartBlue"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-flipkartBg dark:bg-gray-950 min-h-screen text-black dark:text-white transition-colors duration-300">
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-flipkartBlue transition-colors mb-6 cursor-pointer"
        >
          <FaChevronLeft size={10} />
          <span>BACK</span>
        </button>

        <div className="bg-white dark:bg-gray-900 rounded-sm shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-8">
          <h1 className="text-xl md:text-2xl font-black mb-6 flex items-center gap-2 text-flipkartBlue border-b border-gray-100 dark:border-gray-800 pb-3">
            <FaEdit />
            Edit Product
          </h1>

          <form onSubmit={submitHandler} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Left Column Fields */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Product Title</label>
                  <input
                    type="text"
                    placeholder="Enter product name"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Price (INR)</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    required
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Mobiles, Electronics, Fashion"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Rating</label>
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      value={rating}
                      onChange={(e) => setRating(e.target.value)}
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Stock Qty</label>
                    <input
                      type="number"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Low Stock Warn</label>
                    <input
                      type="number"
                      value={lowStockAlert}
                      onChange={(e) => setLowStockAlert(e.target.value)}
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Product Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full font-semibold"
                  >
                    <option value="active">Active (Available)</option>
                    <option value="inactive">Inactive (Hidden)</option>
                    <option value="out-of-stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              {/* Right Column Fields (Media & Description) */}
              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Image Asset</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue flex-1"
                    />
                    <label className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border border-gray-300 dark:border-gray-700 flex items-center justify-center cursor-pointer gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                      <FaUpload />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => uploadFile(e, "image")}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  {image && (
                    <div className="mt-2 w-20 h-20 border border-gray-100 dark:border-gray-800 rounded p-1 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                      <img src={image} alt="Preview" className="max-h-full max-w-full object-contain" />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Video Asset (Optional)</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Video URL"
                      value={video}
                      onChange={(e) => setVideo(e.target.value)}
                      className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue flex-1"
                    />
                    <label className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 px-4 py-2 border border-gray-300 dark:border-gray-700 flex items-center justify-center cursor-pointer gap-1.5 text-xs font-bold text-gray-700 dark:text-gray-300">
                      <FaUpload />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => uploadFile(e, "video")}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  {video && (
                    <div className="mt-2 w-20 h-20 border border-gray-100 dark:border-gray-800 rounded p-1 bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
                      <video src={video} className="max-h-full max-w-full object-contain" muted />
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-gray-500">Description</label>
                  <textarea
                    placeholder="Provide full description of the product"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                    className="p-3 text-sm border rounded-sm bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-800 focus:outline-none focus:border-flipkartBlue w-full"
                    required
                  />
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex justify-end">
              <button
                type="submit"
                disabled={uploading}
                className="bg-flipkartOrange hover:bg-orange-600 text-white font-black uppercase text-xs tracking-wider py-3.5 px-10 shadow transition-colors duration-200 cursor-pointer disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Save Product Details"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditProduct;