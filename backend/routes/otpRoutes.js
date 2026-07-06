const express = require("express");

const router = express.Router();

const sendEmail = require("../utils/sendEmail");

require("dotenv").config();

router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "OTP Route Working",
  });
});

// ==============================
// SEND OTP
// ==============================

router.post("/send", async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {

      return res.status(400).json({
        success: false,
        message: "Email is required",
      });

    }

    const otp =
      Math.floor(
        100000 + Math.random() * 900000
      );

    console.log("EMAIL:", email);
    console.log("OTP:", otp);

    const html = `
      <div style="
      max-width:600px;
      margin:auto;
      padding:30px;
      font-family:Arial;
      border:1px solid #ddd;
      border-radius:10px;
      ">

      <h2 style="color:#2563eb;">
      ShopSphere
      </h2>

      <p>Hello,</p>

      <p>Your OTP is:</p>

      <h1 style="
      font-size:40px;
      letter-spacing:5px;
      color:#2563eb;
      ">
      ${otp}
      </h1>

      <p>
      This OTP is valid for
      <b>5 minutes</b>.
      </p>

      <hr>

      <small>
      Please don't share this OTP with anyone.
      </small>

      </div>
    `;

    const sent = await sendEmail(

      email,

      "ShopSphere OTP Verification",

      html

    );

    if (!sent) {

      return res.status(500).json({

        success: false,

        message: "Failed to send email",

      });

    }

    global.otpStore =
      global.otpStore || {};

    global.otpStore[email] =
      otp;

    res.json({

      success: true,

      message: "OTP Sent Successfully",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message: error.message,

    });

  }

});

// ==============================
// VERIFY OTP
// ==============================

router.post("/verify", (req, res) => {

  const { email, otp } =
    req.body;

  if (

    global.otpStore &&

    String(global.otpStore[email]) ===
      String(otp)

  ) {

    delete global.otpStore[email];

    return res.json({

      success: true,

      message: "OTP Verified",

    });

  }

  return res.status(400).json({

    success: false,

    message: "Invalid OTP",

  });

});

module.exports = router;