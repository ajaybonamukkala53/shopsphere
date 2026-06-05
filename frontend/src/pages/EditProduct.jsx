import { useEffect, useState } from "react";

import axios from "axios";

import { useParams, useNavigate }
from "react-router-dom";

import Navbar from "../components/Navbar";

function EditProduct() {

  const { id } = useParams();

  const navigate = useNavigate();



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



  useEffect(() => {

    const fetchProduct =
      async () => {

        try {

          const { data } =
            await axios.get(
              "http://localhost:5000/api/products"
            );



          const product =
            data.find(
              (item) =>
                item._id === id
            );



          setTitle(product.title);

          setPrice(product.price);

          setImage(product.image);

          setDescription(
            product.description
          );

          setCategory(
            product.category
          );

        } catch (error) {

          console.log(error);

        }
      };

    fetchProduct();

  }, [id]);



  const submitHandler =
    async (e) => {

      e.preventDefault();

      try {

        await axios.put(

          `http://localhost:5000/api/products/${id}`,

          {
            title,
            price,
            image,
            description,
            category,
          }

        );



        alert(
          "Product Updated Successfully"
        );



        navigate("/admin");

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

        <h1>Edit Product</h1>



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

          Update Product

        </button>

      </form>

    </div>
  );
}

export default EditProduct;