const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// =======================
// ROUTES
// =======================

const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const otpRoutes = require("./routes/otpRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

const app = express();

// =======================
// MIDDLEWARE
// =======================

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// =======================
// MONGODB CONNECTION
// =======================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    console.log("================================");
  })
  .catch((err) => {
    console.error("================================");
    console.error("❌ MongoDB Connection Failed");
    console.error(err.message);
    console.error("================================");
    process.exit(1);
  });

// =======================
// API ROUTES
// =======================

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/users", authRoutes);
app.use("/api/upload", uploadRoutes);

// =======================
// HOME ROUTE
// =======================

app.get("/", (req, res) => {
  res.status(200).send("🚀 ShopSphere Backend Running Successfully");
});

// =======================
// 404 HANDLER
// =======================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

// =======================
// GLOBAL ERROR HANDLER
// =======================

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
});

// =======================
// START SERVER
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("================================");
  console.log(`🚀 Server Running on Port ${PORT}`);
  console.log("================================");
});