const mongoose = require("mongoose");

const ULCSchema = new mongoose.Schema({
  guest: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Club",
  },
  home: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Club",
  },
  score: [],
  date: {
    type: Date,
    default: new Date(),
  },
});

const ULC = mongoose.model("ULC", ULCSchema);

module.exports = ULC;
