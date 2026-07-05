const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcryptjs");

const User = require("./models/User");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    try {
      const hashedPassword = await bcrypt.hash("admin123", 10);

      const adminUser = await User.create({
        name: "Admin User",
        email: "admin@shopsphere.com",
        password: hashedPassword,
        role: "admin",
      });

      console.log("✅ Admin user created successfully!");
      console.log("Email: admin@shopsphere.com");
      console.log("Password: admin123");
      console.log("Role: admin");

      process.exit();
    } catch (error) {
      console.log("Error:", error.message);
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log("Connection Error:", error.message);
    process.exit(1);
  });
