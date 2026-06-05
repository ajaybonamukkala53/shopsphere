const mongoose =
  require("mongoose");

const wishlistSchema =
  new mongoose.Schema(

    {

      userEmail: String,

      productId: String,

      title: String,

      image: String,

      price: Number,

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(

    "Wishlist",

    wishlistSchema

  );