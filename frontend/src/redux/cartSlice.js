import {
  createSlice,
} from "@reduxjs/toolkit";



// GET CURRENT USER

const getUser = () => {

  return JSON.parse(
    localStorage.getItem("user")
  );
};



// GET USER CART

const getCart = () => {

  const user = getUser();

  if (!user) return [];



  const cart =
    localStorage.getItem(

      `cart_${user.email}`

    );



  return cart
    ? JSON.parse(cart)
    : [];
};




const cartSlice =
  createSlice({

    name: "cart",



    initialState: {

      cartItems: getCart(),

    },



    reducers: {

      // LOAD USER CART

      loadCart:
        (state) => {

          state.cartItems =
            getCart();
        },




      // ADD TO CART

      addToCart:
        (state, action) => {

          const user =
            getUser();




          if (!user) {

            alert(
              "Please Login First"
            );

            return;
          }




          const existItem =
            state.cartItems.find(

              (item) =>

                item._id ===
                action.payload._id

            );




          if (existItem) {

            existItem.quantity += 1;

          } else {

            state.cartItems.push({

              ...action.payload,

              quantity: 1,

            });
          }




          localStorage.setItem(

            `cart_${user.email}`,

            JSON.stringify(
              state.cartItems
            )

          );
        },




      // REMOVE ITEM

      removeFromCart:
        (state, action) => {

          const user =
            getUser();




          state.cartItems =
            state.cartItems.filter(

              (item) =>

                item._id !==
                action.payload

            );




          localStorage.setItem(

            `cart_${user.email}`,

            JSON.stringify(
              state.cartItems
            )

          );
        },




      // INCREASE QUANTITY

      increaseQuantity:
        (state, action) => {

          const user =
            getUser();




          const item =
            state.cartItems.find(

              (product) =>

                product._id ===
                action.payload

            );




          if (item) {

            item.quantity += 1;
          }




          localStorage.setItem(

            `cart_${user.email}`,

            JSON.stringify(
              state.cartItems
            )

          );
        },




      // DECREASE QUANTITY

      decreaseQuantity:
        (state, action) => {

          const user =
            getUser();




          const item =
            state.cartItems.find(

              (product) =>

                product._id ===
                action.payload

            );




          if (
            item &&
            item.quantity > 1
          ) {

            item.quantity -= 1;
          }




          localStorage.setItem(

            `cart_${user.email}`,

            JSON.stringify(
              state.cartItems
            )

          );
        },




      // CLEAR CART

      clearCart:
        (state) => {

          const user =
            getUser();




          state.cartItems = [];




          localStorage.removeItem(

            `cart_${user.email}`

          );
        },

    },

  });




export const {

  loadCart,

  addToCart,

  removeFromCart,

  increaseQuantity,

  decreaseQuantity,

  clearCart,

} = cartSlice.actions;



export default
cartSlice.reducer;