const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
    PNumber: String,
    PName: String,
    PPosition: String,
    PAge: String,
    PHeight: String,
    PWeight: String,
    PCollege: String,
    PSalary: String
  });

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;