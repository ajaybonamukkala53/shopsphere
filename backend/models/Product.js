  const mongoose = require("mongoose");

  const productSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      image: {
        type: String,
        default: "",
      },
      video: {
    type: String,
    default: "",
  },

      images: [
        {
          type: String,
        },
      ],

      price: {
        type: Number,
        required: true,
        min: 0,
      },

      category: {
        type: String,
        default: "General",
      },

      brand: {
        type: String,
        default: "",
      },

      rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
      },

      numReviews: {
        type: Number,
        default: 0,
      },

      stock: {
        type: Number,
        default: 0,
        min: 0,
      },

      sold: {
        type: Number,
        default: 0,
      },

      isFeatured: {
        type: Boolean,
        default: false,
      },

      sku: {
        type: String,
        unique: true,
        sparse: true,
      },

      status: {
        type: String,
        enum: ["active", "inactive", "out-of-stock"],
        default: "active",
      },
    },
    {
      timestamps: true,
    }
  );

  module.exports = mongoose.model("Product", productSchema);