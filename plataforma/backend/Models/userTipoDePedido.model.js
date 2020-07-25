const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tipoDePedidoSchema = new Schema({
    Name: {
        type: String
    }
},{
    timestamps: true,
});

const TipoDePedido = mongoose.model('TipoDePedidos',tipoDePedidoSchema);

module.exports = TipoDePedido;