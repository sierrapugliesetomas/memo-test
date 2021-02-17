const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  playerName: { type: String, required: true },
  time: { type: String, required: true },
  moves: { type: String, required: true },
});

module.exports = mongoose.model("Score", scoreSchema);
