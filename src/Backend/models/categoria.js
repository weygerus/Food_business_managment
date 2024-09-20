
const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({

  nome: { type: String, required: true, unique: true },

  descricao: { type: String, required: true },

  dataCadastro: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Categoria', categoriaSchema)
