const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  playerName: { type: String, required: true },
  time: { type: String, required: true },
  moves: { type: String, required: true },
  // imagePath: { type: String, required: true },
  // ToDo: change properties to proper types and names
});

module.exports = mongoose.model("Score", scoreSchema);
