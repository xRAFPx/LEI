const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Name: {
        type: String,
    },
    Email: {
        type: String,
    },
    Password: {
        type: String,
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;