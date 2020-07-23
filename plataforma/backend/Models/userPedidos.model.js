const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    Servico: {
        type: String,
    },
    TipoDePedido: {
        type: String,
    },
    NaturezaDePedido: {
        type: String,
    },
    Prioridade: {
        type: String,
    },
    Requisitante: {
        type: String,
    },
    Email: {
        type: String,
    },
    Contacto: {
        type: Number,
    },
    Erro: {
        type: String,
    },
    Descricao: {
        type: String,
    },
    User: {
        type: String,
        default: -1,
    },
}, {
    timestamps: true,
});

const Pedidos = mongoose.model('Pedidos',pedidosSchema);

module.exports = Pedidos;
