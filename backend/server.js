const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// ROUTES
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const otpRoutes = require("./routes/otpRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// MIDDLEWARE
app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// MONGODB CONNECTION
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected ✅"
    );
  })
  .catch((error) => {
    console.log(error);
  });

// API ROUTES
app.use(
  "/api/products",
  productRoutes
);

app.use(
  "/api/orders",
  orderRoutes
);

app.use(
  "/api/reviews",
  reviewRoutes
);

app.use(
  "/api/otp",
  otpRoutes
);

app.use(
  "/api/payment",
  paymentRoutes
);

app.use(
  "/api/wishlist",
  wishlistRoutes
);

app.use(
  "/api/users",
  authRoutes
);
app.use(
  "/api/upload",
  uploadRoutes
);


// TEST ROUTE
app.get("/", (req, res) => {
  res.send(
    "ShopSphere Backend Running 🚀"
  );
});

// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server Running on Port ${PORT} 🚀`
  );
});