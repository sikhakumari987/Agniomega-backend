const mongoose = require("mongoose");

const blogPageSchema = new mongoose.Schema({
  title: { type: String },
  subtitle: { type: String }
});

module.exports = mongoose.model("BlogPage", blogPageSchema);
