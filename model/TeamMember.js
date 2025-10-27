const mongoose = require("mongoose");

const TeamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  linkedin: { type: String},
  twitter : { type: String},
  instagram : { type: String},
  imageUrl: { type: String },
  imageId : {type: String} // Store image URL or filename
}, { timestamps: true });

module.exports = mongoose.model("TeamMember", TeamMemberSchema);