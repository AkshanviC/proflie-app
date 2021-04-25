const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: String },
  image: { type: String, required: true },
  workExperience: { type: Array },
});

module.exports = mongoose.model("Profile", profileSchema);
