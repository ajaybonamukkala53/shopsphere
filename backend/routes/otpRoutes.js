const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

require("dotenv").config();

// ============================
// TEST ROUTE
// ============================

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "OTP Route Working ✅",
  });
});

// ============================
// SEND OTP
// ============================

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

    console.log("====================================");
    console.log("📧 EMAIL:", email);
    console.log("🔐 OTP:", otp);

    console.log("BREVO_EMAIL:", process.env.BREVO_EMAIL);
    console.log("FROM_EMAIL:", process.env.FROM_EMAIL);
    console.log(
      "SMTP KEY EXISTS:",
      !!process.env.BREVO_SMTP_KEY
    );

    console.log("====================================");

    const transporter = nodemailer.createTransport({

      host: "smtp-relay.brevo.com",

      port: 587,

      secure: false,

      requireTLS: true,

      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_SMTP_KEY,
      },

      connectionTimeout: 60000,

      greetingTimeout: 60000,

      socketTimeout: 60000,

      tls: {
        rejectUnauthorized: false,
      },

      logger: true,

      debug: true,

    });

    console.log("Checking SMTP Connection...");

    await transporter.verify();

    console.log("✅ Brevo SMTP Connected");

    const info = await transporter.sendMail({

      from: `"ShopSphere" <${process.env.FROM_EMAIL}>`,

      to: email,

      subject: "ShopSphere OTP Verification",

      html: `
      <div style="
      max-width:600px;
      margin:auto;
      font-family:Arial;
      padding:30px;
      border-radius:10px;
      border:1px solid #ddd;
      ">

      <h2 style="color:#2563eb;">
      ShopSphere
      </h2>

      <p>Hello,</p>

      <p>Your One-Time Password (OTP) is:</p>

      <h1 style="
      font-size:42px;
      color:#2563eb;
      letter-spacing:5px;
      ">
      ${otp}
      </h1>

      <p>
      This OTP is valid for <b>5 minutes</b>.
      </p>

      <hr>

      <small>
      If you didn't request this OTP,
      please ignore this email.
      </small>

      </div>
      `,

    });

    console.log("====================================");
    console.log("✅ EMAIL SENT");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);
    console.log("====================================");

    global.otpStore =
      global.otpStore || {};

    global.otpStore[email] =
      otp;

    res.json({
      success: true,
      message: "OTP Sent Successfully",
    });

  } catch (error) {

    console.log("====================================");
    console.log("❌ OTP ERROR");
    console.log(error);
    console.log("Message:", error.message);
    console.log("Code:", error.code);
    console.log("Command:", error.command);
    console.log("====================================");

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});

// ============================
// VERIFY OTP
// ============================

router.post("/verify", (req, res) => {

  const { email, otp } = req.body;

  console.log("VERIFY EMAIL:", email);
  console.log("ENTERED OTP:", otp);
  console.log(
    "STORED OTP:",
    global.otpStore?.[email]
  );

  if (
    global.otpStore &&
    String(global.otpStore[email]) ===
      String(otp)
  ) {

    delete global.otpStore[email];

    return res.json({
      success: true,
      message: "OTP Verified Successfully",
    });

  }

  return res.status(400).json({
    success: false,
    message: "Invalid OTP",
  });

});

module.exports = router;