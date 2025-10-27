const mongoose = require("mongoose");

const OTPSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  expires: { type: Date, required: true },
  password: { type: String },  // ✅ temp store password
  name: { type: String }       // ✅ temp store name
});

module.exports = mongoose.model("OTP", OTPSchema);
