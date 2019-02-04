const mongoose = require('mongoose');
var Schema = mongoose.Schema;


const TeamSchema = new Schema({
    TName: String,
    players: [{
        type: Schema.Types.ObjectId,
        ref: 'Player'
      }],
    Coach: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    FPoints: String
})


const Team = mongoose.model('Team', TeamSchema)
module.exports =  Team;