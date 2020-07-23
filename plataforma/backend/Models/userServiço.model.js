const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const servicoSchema = new Schema({
    Name: {
        type: String
    }
},{
    timestamps: true,
});

const Servico = mongoose.model('Servicos',servicoSchema);

module.exports = Servico;