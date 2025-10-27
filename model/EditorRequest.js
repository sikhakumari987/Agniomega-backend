// const mongoose = require("mongoose");

// const editorRequestSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "Editor" },
//   name: { type: String, required: true },            // ✅ add name
//   email: { type: String, required: true },
//   password: { type: String, required: true },        // ✅ add password
//   status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
//   isVerified: { type: Boolean, default: false },    // ✅ OTP verified
//   otp: { type: String }                               // ✅ OTP code
// });

// module.exports = mongoose.model("EditorRequest", editorRequestSchema);
