const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSessionSchema = new Schema({
    userId: {
        type: Number,
        default: -1
    },
}, {
    timestamps: true,
});

const UserSession = mongoose.model('UserSession', userSessionSchema);

module.exports = UserSession;