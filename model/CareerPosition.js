const mongoose = require('mongoose');

const careerPositionSchema = new mongoose.Schema({
  role: { type: String, required: true },
  description: { type: String },
  iconUrl: { type: String },
  iconId: { type: String }
 });

module.exports = mongoose.model('CareerPosition', careerPositionSchema);

