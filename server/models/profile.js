const mongoose = require("mongoose");

const profileSchema = mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number },
  image: { type: String },
  workExperience: { type: Array },
});

module.exports = mongoose.model("Profile", profileSchema);
