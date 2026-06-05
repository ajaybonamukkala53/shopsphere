const express =
  require("express");

const Razorpay =
  require("razorpay");

const router =
  express.Router();

require("dotenv").config();



// CREATE RAZORPAY INSTANCE

const razorpay =
  new Razorpay({

    key_id:
      process.env.RAZORPAY_KEY_ID,

    key_secret:
      process.env.RAZORPAY_KEY_SECRET,

  });



// TEST ROUTE

router.get(
  "/test",

  (req, res) => {

    res.json({

      success: true,

      message:
        "Payment Route Working",

    });

  }
);



// CREATE ORDER

router.post(
  "/create-order",

  async (req, res) => {

    try {

      const options = {

        amount:
          Number(req.body.amount) * 100,

        currency:
          "INR",

        receipt:
          `receipt_${Date.now()}`,

      };



      const order =
        await razorpay.orders.create(
          options
        );



      res.json(order);

    } catch (error) {

      console.log(
        "RAZORPAY ERROR:",
        error
      );



      res.status(500).json({

        success: false,

        message:
          error.message,

      });
    }
  }
);

module.exports =
  router;