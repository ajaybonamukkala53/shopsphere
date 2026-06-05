const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const product = new Product({
  title: req.body.title,
  description: req.body.description,
  image: req.body.image,
  video: req.body.video,

  price: Number(req.body.price),
  category: req.body.category,

  rating: Number(req.body.rating || 5),
  stock: Number(req.body.stock || 10),

  lowStockAlert: Number(
    req.body.lowStockAlert || 5
  ),
});

    const savedProduct =
      await product.save();

    res.status(201).json({
      success: true,
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const product =
      await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product Not Found",
      });
    }

    product.title = req.body.title;
    product.description =
      req.body.description;
    product.image = req.body.image;
    product.video = req.body.video;
    product.price = Number(req.body.price);
    product.category =
      req.body.category;
    product.rating = Number(
      req.body.rating
    );
    product.stock = Number(
      req.body.stock
    );
    product.lowStockAlert =
      Number(
        req.body.lowStockAlert
      );

    await product.save();

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Product.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Product Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;