const mongoose = require('mongoose');

const contactPageSchema = new mongoose.Schema({
  contactHeading: String,
  contactWriteUp: String,
  address: String,
  phone : String,
  email : String,
  workingHours : String
  
});

module.exports = mongoose.model('contactPage', contactPageSchema);
