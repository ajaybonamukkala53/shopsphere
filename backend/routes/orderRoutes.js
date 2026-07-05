const express = require("express");
const router = express.Router();

const Order = require("../models/Order");
const Product = require("../models/Product");
const sendEmail = require("../utils/sendEmail");

// CREATE ORDER

router.post("/", async (req, res) => {
  try {

    if (
      !req.body.products ||
      !Array.isArray(req.body.products)
    ) {
      return res.status(400).json({
        success: false,
        message: "Products are required",
      });
    }

    // STOCK CHECK

    for (const item of req.body.products) {

      const product =
        await Product.findById(
          item._id
        );

      if (!product) {

        return res.status(404).json({
          success: false,
          message: `${item.title} Not Found`,
        });

      }

    }
    
    

    // CREATE ORDER

    const order =
      new Order(req.body);

    await order.save();

    // REDUCE STOCK

    for (const item of req.body.products) {

      const product =
        await Product.findById(
          item._id
        );

      if (product) {

        const quantity =
          item.quantity || 1;

        product.stock =
          Math.max(
            0,
            product.stock -
              quantity
          );

        await product.save();

      }

    }

    res.status(201).json({
      success: true,
      order,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// ADMIN - GET ALL ORDERS

router.get(
  "/admin/all",
  async (req, res) => {
    try {

      const orders =
        await Order.find()
          .sort({
            createdAt: -1,
          });

      res.json(orders);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);
// TEST EMAIL

router.get(
  "/test-email",
  async (req, res) => {
    try {

      await sendEmail(
        process.env.EMAIL_USER,
        "ShopSphere Test Email",
        `
        <h1>Email Working ✅</h1>
        <p>Nodemailer is configured correctly.</p>
        `
      );

      res.send(
        "Test Email Sent"
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

// GET USER ORDERS

router.get(
  "/:email",
  async (req, res) => {
    try {

      const orders =
        await Order.find({
          userEmail:
            req.params.email,
        }).sort({
          createdAt: -1,
        });

      res.json(orders);

    } catch (error) {

      console.log(error);

      res.status(500).json({
        message:
          error.message,
      });

    }
  }
);

// UPDATE ORDER STATUS

router.put(
  "/status/:id",
  async (req, res) => {
    try {

      const order =
        await Order.findById(
          req.params.id
        );

      if (!order) {

        return res.status(404).json({
          success: false,
          message:
            "Order Not Found",
        });

      }

      order.orderStatus =
        req.body.status;

      await order.save();

      res.json({
        success: true,
        message:
          "Order Status Updated",
        order,
      });

    } catch (error) {

      console.log(error);

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }
  }
);

module.exports = router;