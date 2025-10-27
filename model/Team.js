const mongoose = require("mongoose");

const TeamSchema = new mongoose.Schema({
  title: { type: String},
  subtitle: { type: String},
  filter: {type: String}
});

module.exports = mongoose.model("Team", TeamSchema);
