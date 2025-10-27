const mongoose = require('mongoose');

const careerWorkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String },
  iconUrl: { type: String },
  iconId: { type: String }
 });

module.exports = mongoose.model('CareerWork', careerWorkSchema);

