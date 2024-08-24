const mongoose = require('mongoose')

const cardapioProdutoSchema = new mongoose.Schema({
  nome: { type: String, required: true },

  descricao: { type: String, required: true },

  categoria: { type: String, required: true },

  preco: { type: Number, required: true },

  disponibilidade: { type: Boolean, default: true },

  imagem: { type: String },

  ingredientes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingrediente' }], // Referência aos ingredientes

  tempoPreparo: { type: Number, required: true }, // Tempo de preparo em minutos

  calorias: { type: Number },

  dataCadastro: { type: Date, default: Date.now }
})


module.exports = mongoose.model('CardapioProduto', cardapioProdutoSchema)