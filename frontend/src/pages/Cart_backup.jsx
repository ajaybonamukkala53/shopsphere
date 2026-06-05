import Navbar
from "../components/Navbar";

import {
  useSelector,
  useDispatch
} from "react-redux";

import {

  removeFromCart,

  increaseQuantity,

  decreaseQuantity

} from "../redux/cartSlice";

function Cart() {

  const dispatch =
  useDispatch();

  const cartItems =
  useSelector(

    (state) =>
      state.cart.cartItems

  );



  const totalPrice =
  cartItems.reduce(

    (total, item) =>

      total +
      item.price * item.quantity,

    0

  );



  return (

    <div>

      <Navbar />

      <h1
        style={{
          textAlign: "center",
          marginTop: "20px"
        }}
      >
        Cart Page
      </h1>



      <h2
        style={{
          textAlign: "center"
        }}
      >
        Total: ${totalPrice}
      </h2>



      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center"
        }}
      >

        {
          cartItems.map((item) => (

            <div
              key={item._id}
              style={{
                border: "1px solid gray",
                margin: "20px",
                padding: "20px",
                width: "250px",
                textAlign: "center"
              }}
            >

              <img
                src={item.image}
                alt={item.title}
                style={{
                  width: "200px",
                  height: "200px",
                  objectFit: "cover"
                }}
              />

              <h2>{item.title}</h2>

              <h3>${item.price}</h3>



              <div>

                <button
                  onClick={() =>
                    dispatch(
                      decreaseQuantity(
                        item._id
                      )
                    )
                  }
                >
                  -
                </button>



                <span
                  style={{
                    margin: "10px"
                  }}
                >
                  {item.quantity}
                </span>



                <button
                  onClick={() =>
                    dispatch(
                      increaseQuantity(
                        item._id
                      )
                    )
                  }
                >
                  +
                </button>

              </div>



              <br />



              <button

                onClick={() =>
                  dispatch(
                    removeFromCart(
                      item._id
                    )
                  )
                }

                style={{
                  backgroundColor: "red",
                  color: "white",
                  padding: "10px",
                  border: "none"
                }}
              >

                Remove

              </button>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Cart;