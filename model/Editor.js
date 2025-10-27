// models/Editor.js
const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: { type: String, required: true },

  // ✅ NEW FIELDS
  isVerified: { type: Boolean, default: false }, // email verify hua ya nahi
  isApproved: { type: Boolean, default: false }, // admin approve karega
});

module.exports = mongoose.model("Editor", editorSchema);
