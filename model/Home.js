const mongoose = require('mongoose');

const homePageSchema = new mongoose.Schema({
  welcomeContent: String,
  writeUp : String,
  footerLeft : String,
  footerRight : String
  
});

module.exports = mongoose.model('homePage', homePageSchema);
