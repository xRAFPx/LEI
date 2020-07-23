const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const prioridadeSchema = new Schema({
    Name: {
        type: String
    }
},{
    timestamps: true,
});

const Prioridade = mongoose.model('Prioridades', prioridadeSchema);

module.exports = Prioridade;