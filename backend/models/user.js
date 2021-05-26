const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    userName: {type: String},
    userPassword: {type: String}
});

module.exports = mongoose.model('user', userSchema);
