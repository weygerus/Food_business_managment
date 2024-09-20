const mongoose = require('mongoose')

const EntradaSchema = new mongoose.Schema({

    Data: { type: Date, required: true },

    Descricao: { type: String, required: true },

    Valor: { type: Number, required: true },

    Categoria: { type: String, required: true},

    MetodoPagamento: { type: String, required: true },

    Cliente: { type: String, required: true },

    UserId: { type: String, required: true }
})

module.exports = mongoose.model('Entrada', EntradaSchema)