const nodemailer = require("nodemailer");

// Gmail SMTP config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,   // Gmail
    pass: process.env.pass,   // Gmail ka App Password
  },
});

/**
 * Send email function
 * @param {string} to - Receiver email
 * @param {string} subject - Email subject
 * @param {string} text - fallback plain text
 * @param {string} html - HTML content
 */
async function sendMail(to, subject, text, html) {
  try {
    await transporter.sendMail({
      from: '"AgniOmega" <sikhachandra541@gmail.com>',
      to,
      subject,
      text,
      html,   // ✅ add HTML support for buttons
    });
    console.log(`✅ Mail sent to ${to}`);
  } catch (err) {
    console.error("❌ Mail error:", err);
  }
}

module.exports = sendMail;
