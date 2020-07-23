const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const naturezaDePedidoSchema = new Schema({
    Name: {
        type: String
    }

},{
    timestamps: true,
});

const NaturezaDePedido = mongoose.model('NaturezaDePedidos',naturezaDePedidoSchema);

module.exports = NaturezaDePedido;