const mongoose = require('mongoose');

const aboutPageSchema = new mongoose.Schema({
  aboutAgniomega: String,
  aboutWriteUp: String,
  content: String,
  mission: String,
  vision: String,
  value1: String,
  value2: String,
  value3: String,
  value4: String,
  value5: String,
  value6: String,
  stage1: String,
  stage2: String,
  stage3: String
});

module.exports = mongoose.model('aboutPage' , aboutPageSchema)