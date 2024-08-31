
const mongoose = require('mongoose')

const categoriaSchema = new mongoose.Schema({

  nome: { type: String, required: true, unique: true },

  descricao: { type: String, required: true },

  dataCadastro: { type: Date, default: Date.now },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
})

module.exports = mongoose.model('Categoria', categoriaSchema)
