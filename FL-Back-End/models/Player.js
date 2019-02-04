const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    Number: String,
    Name: String,
    Position: String,
    Age: String,
    Height: String,
    Weight: String,
    College: String,
    Salary: String
  });

const Player = mongoose.model('Player', PlayerSchema);

module.exports = Player;