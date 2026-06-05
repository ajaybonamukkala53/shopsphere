const Product = require("../models/Product");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.json(products);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      image,
      description,
      category,
      rating,
      stock,
      lowStockAlert,
    } = req.body;

    const product = await Product.create({
      title,
      price,
      image,
      description,
      category,
      rating,
      stock,
      lowStockAlert,
    });

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE PRODUCT
const updateProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      image,
      description,
      category,
      rating,
      stock,
      lowStockAlert,
    } = req.body;

    const product = await Product.findById(
      req.params.id
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    product.title =
      title || product.title;

    product.price =
      price || product.price;

    product.image =
      image || product.image;

    product.description =
      description ||
      product.description;

    product.category =
      category || product.category;

    product.rating =
      rating || product.rating;

    product.stock =
      stock ?? product.stock;

    product.lowStockAlert =
      lowStockAlert ??
      product.lowStockAlert;

    const updatedProduct =
      await product.save();

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE PRODUCT
const deleteProduct = async (
  req,
  res
) => {
  try {
    const product =
      await Product.findById(
        req.params.id
      );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found",
      });
    }

    await product.deleteOne();

    res.json({
      message:
        "Product Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
};