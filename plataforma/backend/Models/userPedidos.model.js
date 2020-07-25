const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const pedidosSchema = new Schema({
    Servico: {
        type: Schema.Types.ObjectId,
        ref: 'Servicos'
    },
    TipoDePedido: {
        type: Schema.Types.ObjectId,
        ref: 'TipoDePedidos'
    },
    NaturezaDePedido: {
        type: Schema.Types.ObjectId,
        ref: 'NaturezaDePedidos'
    },
    Prioridade: {
        type: Schema.Types.ObjectId,
        ref: 'Prioridades'
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
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
}, {
    timestamps: true,
});

const Pedidos = mongoose.model('Pedidos',pedidosSchema);

module.exports = Pedidos;
