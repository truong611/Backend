const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
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
    }
});

const Score = mongoose.model("Score", ScoreSchema);

module.exports = Score;
