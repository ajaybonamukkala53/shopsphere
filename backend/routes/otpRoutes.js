const express =
  require("express");

const router =
  express.Router();

const nodemailer =
  require("nodemailer");

require("dotenv").config();

router.get(
  "/test",

  (req, res) => {

    res.json({

      success: true,

      message:
        "OTP Route Working",

    });
  }
);
router.post(
  "/send",
  async (req, res) => {
    try {

      console.log("BODY:", req.body);

      const { email } = req.body;
      console.log("BODY:", req.body);
console.log("EMAIL:", email);

if (!email) {
  return res.status(400).json({
    success: false,
    message: "Email is required",
  });
}

      console.log("EMAIL:", email);

      const otp = Math.floor(
        100000 +
        Math.random() * 900000
      );

      console.log("OTP:", otp);

      const transporter =
        nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });

      console.log("Transport Created");

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: "ShopSphere OTP",
        html: `<h1>Your OTP is ${otp}</h1>`,
      });

      console.log("Email Sent");

      global.otpStore =
        global.otpStore || {};

      global.otpStore[email] =
        otp;

      console.log("OTP Saved");

      return res.json({
        success: true,
        message: "OTP Sent Successfully",
      });

    } catch (error) {

      console.log(
        "OTP ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message: error.message,
      });

    }
  }
);


router.post(
  "/verify",
  async (req, res) => {

    const {
      email,
      otp
    } = req.body;

    if (
      global.otpStore &&
      String(
        global.otpStore[email]
      ) === String(otp)
    ) {

      delete global.otpStore[email];

      return res.json({
        success: true,
      });

    }

    return res
      .status(400)
      .json({
        success: false,
        message:
          "Invalid OTP",
      });

  }
);

module.exports =
  router;