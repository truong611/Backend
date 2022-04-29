const mongoose = require("mongoose");

const LeagueSchema = new mongoose.Schema({
    name: {type: String, required: true},
    clubs: [
        {
            cId: {    type: mongoose.SchemaTypes.ObjectId,
                ref: "Club"},
                detai: [],
                last: []
        }
    ]
   
});

const League = mongoose.model("League", LeagueSchema);

module.exports = League;
