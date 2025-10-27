const mongoose = require('mongoose');

const careerContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subtitle: { type: String },
  description: { type: String },
  quote : {type: String},
  email : {type : String}
 });

module.exports = mongoose.model('CareerContent', careerContentSchema);

