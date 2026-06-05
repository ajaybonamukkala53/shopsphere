const mongoose =
  require("mongoose");

const orderSchema =
  mongoose.Schema(

    {

      products: [

        {

          title: String,

          image: String,

          price: Number,

          quantity: Number,

        },

      ],

      totalPrice: {

        type: Number,

        required: true,

      },

      userEmail: {

        type: String,

        required: true,

      },

      paymentMethod: {

        type: String,

        default: "Online",

      },

      paymentStatus: {

        type: String,

        default: "Paid",

      },

      orderStatus: {

        type: String,

        default:
          "Order Placed",

      },

      deliveryOtp: {

        type: String,

      },

      address: {

        name: String,

        phone: String,

        address: String,

        pincode: String,

      },

    },

    {

      timestamps: true,

    }

  );

module.exports =
  mongoose.model(

    "Order",

    orderSchema

  );