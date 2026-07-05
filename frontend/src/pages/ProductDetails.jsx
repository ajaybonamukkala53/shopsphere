import {

  useEffect,
  useState,

} from "react";

import {

  useParams,

} from "react-router-dom";

import axios from "axios";

import Navbar from "../components/Navbar";



function ProductDetails() {

  const { id } =
    useParams();

  const [product, setProduct] =
    useState(null);

  const [reviews, setReviews] =
    useState([]);

  const [userName,
    setUserName] =
    useState("");

  const [rating,
    setRating] =
    useState("");

  const [comment,
    setComment] =
    useState("");




  useEffect(() => {

    fetchProduct();

    fetchReviews();

  }, []);




  // FETCH PRODUCT

  const fetchProduct =
    async () => {

      try {

        const { data } =
          await axios.get(

            `${import.meta.env.VITE_API_URL}/api/products`

          );




        const single =
          data.find(

            (item) =>

              item._id === id

          );




        setProduct(single);

      } catch (error) {

        console.log(error);

      }
    };




  // FETCH REVIEWS

  const fetchReviews =
    async () => {

      try {

        const { data } =
          await axios.get(

            `http://localhost:5000/api/reviews/${id}`

          );




        setReviews(data);

      } catch (error) {

        console.log(error);

      }
    };




  // ADD REVIEW

  const addReview =
    async () => {

      try {

        await axios.post(

          "http://localhost:5000/api/reviews",

          {

            productId: id,

            userName,

            rating,

            comment,

          }

        );




        alert(
          "Review Added ✅"
        );




        setUserName("");

        setRating("");

        setComment("");




        fetchReviews();

      } catch (error) {

        console.log(error);




        alert(
          "Failed ❌"
        );
      }
    };




  if (!product) {

    return (

      <h1 className="text-4xl font-bold text-center mt-20">

        Loading...

      </h1>

    );
  }




  return (

    <div className="bg-gray-100 min-h-screen">

      <Navbar />




      <div className="max-w-6xl mx-auto p-10">

        <div className="grid md:grid-cols-2 gap-10">

          {/* IMAGE */}

          <img

            src={product.image}

            alt={product.title}

            className="w-full rounded-3xl shadow-xl"

          />




          {/* DETAILS */}

          <div>

            <h1 className="text-5xl font-bold">

              {product.title}

            </h1>




            <p className="text-3xl text-green-600 font-bold mt-5">

              ₹
              {product.price}

            </p>




            <p className="text-xl mt-5">

              {product.description}

            </p>




            <p className="text-xl mt-5">

              Category:
              {" "}

              <span className="font-bold">

                {product.category}

              </span>

            </p>




            <p className="text-xl mt-3">

              Rating:
              {" "}

              <span className="font-bold text-yellow-500">

                ⭐
                {product.rating}

              </span>

            </p>

          </div>

        </div>




        {/* REVIEW FORM */}

        <div className="bg-white p-10 rounded-3xl shadow-xl mt-16">

          <h2 className="text-4xl font-bold mb-8">

            Add Review ⭐

          </h2>




          <div className="space-y-5">

            <input

              type="text"

              placeholder="Your Name"

              value={userName}

              onChange={(e) =>
                setUserName(
                  e.target.value
                )
              }

              className="w-full p-4 border rounded-2xl"

            />




            <input

              type="number"

              placeholder="Rating (1-5)"

              value={rating}

              onChange={(e) =>
                setRating(
                  e.target.value
                )
              }

              className="w-full p-4 border rounded-2xl"

            />




            <textarea

              placeholder="Comment"

              value={comment}

              onChange={(e) =>
                setComment(
                  e.target.value
                )
              }

              rows="5"

              className="w-full p-4 border rounded-2xl"

            />




            <button

              onClick={addReview}

              className="bg-black text-white px-8 py-4 rounded-2xl text-xl font-bold"

            >

              Submit Review 🚀

            </button>

          </div>

        </div>




        {/* REVIEWS */}

        <div className="mt-16">

          <h2 className="text-4xl font-bold mb-10">

            Customer Reviews 💬

          </h2>




          <div className="space-y-6">

            {

              reviews.length > 0

                ? (

                  reviews.map(

                    (review) => (

                      <div

                        key={review._id}

                        className="bg-white p-6 rounded-3xl shadow-xl"

                      >

                        <h3 className="text-2xl font-bold">

                          {

                            review.userName

                          }

                        </h3>




                        <p className="text-yellow-500 text-xl mt-2">

                          ⭐
                          {

                            review.rating

                          }

                        </p>




                        <p className="text-lg mt-4">

                          {

                            review.comment

                          }

                        </p>

                      </div>

                    )

                  )

                )

                : (

                  <h1 className="text-2xl font-bold">

                    No Reviews Yet ❌

                  </h1>

                )

            }

          </div>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;