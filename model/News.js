const mongoose = require("mongoose");

const NewSchema = new mongoose.Schema({
  link: {
    type: String,
    required: true,
  },
  typeNews: {
    type: Number,
    required: true,

  },
  title: {
    type: String,
    default: "https://iupac.org/wp-content/uploads/2018/05/default-avatar.png",
  },
  comment: [
    { uId: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
    },
    comment: {
      type: String,
      required: true,
    }
  }
  ]
});

const News = mongoose.model("News", NewSchema);

module.exports = News;
