

import {

  useDispatch,

} from "react-redux";



import {

  addToCart,

} from "../redux/cartSlice";



import {

  Link,

} from "react-router-dom";



import axios from "axios";



function ProductCard({

  product,

}) {



  const dispatch =

    useDispatch();



  const stock =

    product?.stock ?? 10;



  const lowStockAlert =

    product?.lowStockAlert ?? 5;



  const addWishlist =

    async () => {



      try {



        const user =

          JSON.parse(

            localStorage.getItem(

              "user"

            )

          );



        if (!user) {



          alert(

            "Please Login First"

          );



          return;



        }



        await axios.post(

          "http://localhost:5000/api/wishlist",

          {

            userEmail:

              user.email,



            productId:

              product._id,



            title:

              product.title,



            image:

              product.image,



            price:

              product.price,



            category:

              product.category,



            rating:

              product.rating,

          }

        );



        alert(

          "Added To Wishlist ❤️"

        );



      } catch (error) {



        console.log(error);



        alert(

          "Wishlist Failed ❌"

        );



      }



    };



  const handleAddToCart =

    () => {



      if (stock === 0) {



        alert(

          "Product Out Of Stock ❌"

        );



        return;



      }



      dispatch(

        addToCart(product)

      );



      alert(

        "Added To Cart 🛒"

      );



    };



  return (



    <div

      className="

        bg-white

        dark:bg-gray-800

        text-black

        dark:text-white

        p-5

        rounded-3xl

        shadow-xl

        hover:scale-105

        duration-300

        transition-colors

      "

    >



      {/* IMAGE OR VIDEO */}



      {

        product.video ? (

          <video

            key={product.video}

            autoPlay

            loop

            muted

            playsInline

            className="w-full h-64 object-cover rounded-2xl"

          >

            <source

              src={product.video}

              type="video/mp4"

            />

          </video>

        ) : (

          <img

            src={product.image}

            alt={product.title}

            className="w-full h-64 object-cover rounded-2xl"

          />

        )

      }



      {/* TITLE */}



      <h2 className="text-2xl font-bold mt-5">

        {product.title}

      </h2>



      {/* PRICE */}



      <p className="text-3xl text-green-600 font-bold mt-3">

        ₹{product.price}

      </p>



      {/* CATEGORY */}



      <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">

        {product.category}

      </p>



      {/* RATING */}



      <div className="flex items-center gap-2 mt-3">

        <span className="text-yellow-500 text-2xl">

          ⭐

        </span>



        <span className="text-xl font-bold">

          {product.rating || 5}

        </span>

      </div>



      {/* STOCK */}



      <div className="mt-3">

        <p className="text-blue-600 font-bold text-lg">

          Stock: {stock}

        </p>



        {

          stock === 0 ? (

            <p className="text-red-600 font-bold text-lg">

              Out Of Stock ❌

            </p>

          ) : stock <= lowStockAlert ? (

            <p className="text-orange-500 font-bold text-lg">

              Only {stock} Left ⚠️

            </p>

          ) : (

            <p className="text-green-600 font-bold text-lg">

              In Stock ✅

            </p>

          )

        }

      </div>



      {/* BUTTONS */}



      <div className="grid grid-cols-1 gap-3 mt-6">



        <button

          disabled={

            stock === 0

          }

          onClick={

            handleAddToCart

          }

          className={`w-full py-3 rounded-2xl text-lg font-bold duration-300 ${

            stock === 0

              ? "bg-gray-400 text-white cursor-not-allowed"

              : "bg-black dark:bg-gray-700 text-white hover:bg-gray-800"

          }`}

        >

          {

            stock === 0

              ? "Out Of Stock"

              : "Add To Cart 🛒"

          }

        </button>



        <Link

          to={`/product/${product._id}`}

          className="w-full bg-green-600 text-white py-3 rounded-2xl text-lg font-bold text-center hover:bg-green-700 duration-300"

        >

          View Product 👀

        </Link>



        <button

          onClick={

            addWishlist

          }

          className="w-full bg-pink-600 text-white py-3 rounded-2xl text-lg font-bold hover:bg-pink-700 duration-300"

        >

          Wishlist ❤️

        </button>



      </div>



    </div>



  );



}



export default ProductCard;

 