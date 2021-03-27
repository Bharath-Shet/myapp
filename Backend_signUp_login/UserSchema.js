var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    fname: String,
    email: String,
    password: String,
    phone: String,
    dob: String,
    role: String
})

mongoose.model('User', UserSchema);
module.exports = mongoose.model('User');