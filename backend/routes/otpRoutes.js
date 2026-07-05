const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "OTP Route Working",
  });
});

router.post("/send", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    console.log("EMAIL:", email);
    console.log("OTP:", otp);

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_SMTP_KEY,
      },
    });

    await transporter.verify();

    console.log("✅ Brevo SMTP Connected");

    const info = await transporter.sendMail({
      from: `"ShopSphere" <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: "ShopSphere OTP Verification",
      html: `
        <div style="font-family:Arial;padding:20px">
          <h2>ShopSphere</h2>
          <p>Your OTP is:</p>
          <h1 style="color:#2563eb;">${otp}</h1>
          <p>This OTP is valid for 5 minutes.</p>
        </div>
      `,
    });

    console.log("✅ Email Sent");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);

    global.otpStore = global.otpStore || {};
    global.otpStore[email] = otp;

    res.json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {
    console.log("========== OTP ERROR ==========");
    console.log(error);
    console.log("Message:", error.message);
    console.log("===============================");

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post("/verify", (req, res) => {
  const { email, otp } = req.body;

  if (
    global.otpStore &&
    String(global.otpStore[email]) === String(otp)
  ) {
    delete global.otpStore[email];

    return res.json({
      success: true,
    });
  }

  res.status(400).json({
    success: false,
    message: "Invalid OTP",
  });
});

module.exports = router;