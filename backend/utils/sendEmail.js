require("dotenv").config();

const nodemailer = require("nodemailer");

const sendEmail = async (
  to,
  subject,
  html
) => {
  try {

    const transporter = nodemailer.createTransport({

      host: "smtp-relay.brevo.com",

      port: 587,

      secure: false,

      auth: {

        user: process.env.BREVO_EMAIL,

        pass: process.env.BREVO_SMTP_KEY,

      },

      connectionTimeout: 30000,

      greetingTimeout: 30000,

      socketTimeout: 30000,

    });

    // Verify SMTP Connection
    await transporter.verify();

    console.log("✅ Brevo SMTP Connected");

    const info = await transporter.sendMail({

      from: `"ShopSphere" <${process.env.FROM_EMAIL}>`,

      to,

      subject,

      html,

    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", info.messageId);
    console.log("Accepted:", info.accepted);
    console.log("Rejected:", info.rejected);
    console.log("Response:", info.response);

    return true;

  } catch (error) {

    console.log("========== EMAIL ERROR ==========");
    console.log(error);
    console.log("Message:", error.message);
    console.log("================================");

    return false;

  }
};

module.exports = sendEmail;