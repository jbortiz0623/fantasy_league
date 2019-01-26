const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    Email: String,
    Username: String,
    Password: String,
    Name: String
})

const User = mongoose.model('User', UserSchema);

module.exports = User;