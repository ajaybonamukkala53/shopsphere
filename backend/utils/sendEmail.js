require("dotenv").config();

const axios = require("axios");

const sendEmail = async (to, subject, html) => {
  try {

    console.log("API KEY EXISTS:", !!process.env.BREVO_API_KEY);
    console.log("API KEY PREFIX:", process.env.BREVO_API_KEY?.substring(0,8));

    const response = await axios({

      method: "post",

      url: "https://api.brevo.com/v3/smtp/email",

      headers: {

        accept: "application/json",

        "content-type": "application/json",

        "api-key": process.env.BREVO_API_KEY,

      },

      data: {

        sender: {
          name: "ShopSphere",
          email: process.env.FROM_EMAIL,
        },

        to: [
          {
            email: to,
          },
        ],

        subject,

        htmlContent: html,

      },

    });

    console.log(response.data);

    return true;

  } catch (error) {

    console.log("================================");
    console.log(error.response?.data);
    console.log("================================");

    return false;

  }
};

module.exports = sendEmail;