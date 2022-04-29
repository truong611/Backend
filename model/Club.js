const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  clubName: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png",
  }
});

const Club = mongoose.model("Club", ClubSchema);

module.exports = Club;
