const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({

  nome: { type: String, required: true },

  descricao: { type: String, required: true },

  categoria: { type: String, required: true },

  precoPadrao: { type: String, required: true },

  precoPromo: { type: String, required: false },

  subcategoria: { type: String, required: false },

  fornecedor: { type: String, required: true },
  
  quantidadeEmEstoque: { type: String, required: true },

  quantidadeEmEstoqueMinima: { type: String, required: true, default: 1 },

  codigoBarrasEAN: { type: String, required: true },

  dataValidade: { type: Date, required: true },

  imagemProduto: { type: String, required: false },

  dataCadastro: { type: Date, default: Date.now },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }
})

module.exports = mongoose.model('Produto', produtoSchema)