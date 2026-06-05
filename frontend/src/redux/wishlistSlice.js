import {
  createSlice,
} from "@reduxjs/toolkit";



// GET CURRENT USER

const getUser = () => {

  return JSON.parse(
    localStorage.getItem("user")
  );
};



// GET USER WISHLIST

const getWishlist = () => {

  const user = getUser();

  if (!user) return [];



  const wishlist =
    localStorage.getItem(

      `wishlist_${user.email}`

    );



  return wishlist
    ? JSON.parse(wishlist)
    : [];
};




const wishlistSlice =
  createSlice({

    name: "wishlist",



    initialState: {

      wishlistItems:
        getWishlist(),

    },



    reducers: {

      // ADD TO WISHLIST

      addToWishlist:
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
            state.wishlistItems.find(

              (item) =>

                item._id ===
                action.payload._id

            );




          if (!existItem) {

            state.wishlistItems.push(
              action.payload
            );
          }




          localStorage.setItem(

            `wishlist_${user.email}`,

            JSON.stringify(
              state.wishlistItems
            )

          );
        },




      // REMOVE FROM WISHLIST

      removeFromWishlist:
        (state, action) => {

          const user =
            getUser();




          state.wishlistItems =
            state.wishlistItems.filter(

              (item) =>

                item._id !==
                action.payload

            );




          localStorage.setItem(

            `wishlist_${user.email}`,

            JSON.stringify(
              state.wishlistItems
            )

          );
        },

    },

  });




export const {

  addToWishlist,

  removeFromWishlist,

} = wishlistSlice.actions;



export default
wishlistSlice.reducer;