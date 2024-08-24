const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({

  nome: { type: String, required: true, unique: true },

  descricao: { type: String, required: true },

  categoria: { type: String, required: true },

  precoPadrao: { type: String },

  precoPromo: { type: String, required: true },

  subcategoria: { type: String, required: true },

  fornecedor: { type: String, required: true },

  custo: { type: String, required: true },
  
  quantidadeEmEstoque: { type: String, required: true },

  quantidadeEmEstoqueMinima: { type: String, required: true },

  quantidadeEmEstoqueMaxima: { type: String, required: true },
  
  codigoSKU: { type: String, required: true },

  codigoBarrasEAN: { type: String, required: true },

  dataValidade: { type: String, required: true },

  imagemProduto: { type: String, required: true },

  dataCadastro: { type: Date, default: Date.now },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

module.exports = mongoose.model('Produto', produtoSchema)