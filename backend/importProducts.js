const mongoose = require("mongoose");
require("dotenv").config();

const Product = require("./models/Product");
const products = require("./data");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    try {

      await Product.deleteMany();

      await Product.insertMany(products);

      console.log(
        `${products.length} Products Imported ✅`
      );

      process.exit();

    } catch (error) {

      console.log(error);

      process.exit(1);

    }
  });