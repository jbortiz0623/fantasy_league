const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const Team = new Schema({
    TName: String,
    players: [{
        type: Schema.Types.ObjectId,  //REFERENCING =)
        ref: 'Player'
      }],
    Coach: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    FPoints: String
})

const Team = mongoose.model('Team', TeamSchema);

module.exports = Team;