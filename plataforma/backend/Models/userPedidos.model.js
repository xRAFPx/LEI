const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    Serviço: {
        type: String,
    },
    TipoDePedido: {
        type: String,
    },
    Prioridade: {
        type: String,
    },
    User: {
        type: Number,
        default: -1,
    },
}, {
    timestamps: true,
});

const Pedidos = mongoose.model('Pedidos',pedidosSchema);

module.exports = Pedidos;
