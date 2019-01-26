const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/fantasy_league', { useNewUrlParser: true});

const Player = require('./player');
const Team = require('./team');
const User = require('./user');

module.exports.User = User;
module.exports.Player = Player;
module.exports.Team = Team;