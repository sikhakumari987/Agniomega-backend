const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  category: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: String, required: true },
  imageUrl: { type: String },
  imageId: { type: String } 
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
