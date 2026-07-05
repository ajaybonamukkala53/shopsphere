import { useState } from "react";

import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import Navbar from "../components/Navbar";

function AddProduct() {

  const [title, setTitle] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [image, setImage] =
    useState("");

  const [description,
    setDescription] =
    useState("");

  const [category,
    setCategory] =
    useState("");



  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await axios.post(
          "http://localhost:5000/api/products",
          {
            title,
            price,
            image,
            description,
            category,
          }
        );

        alert(
          "Product Added Successfully"
        );

      } catch (error) {

        console.log(error);

      }
    };



  return (

    <div>

      <Navbar />

      <form
        onSubmit={submitHandler}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "50px auto",
          gap: "20px",
        }}
      >

        <h1>Add Product</h1>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(
              e.target.value
            )
          }
        />

        <button type="submit">
          Add Product
        </button>

      </form>

    </div>
  );
}

export default AddProduct;