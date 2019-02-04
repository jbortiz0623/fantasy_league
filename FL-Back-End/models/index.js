const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fantasy_league2', { useNewUrlParser: true});

const Player = require('./Player');
const Team = require('./Team');
const User = require('./User');

module.exports.User = User;
module.exports.Player = Player;
module.exports.Team = Team;