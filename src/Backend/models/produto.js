const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({

  nome: { type: String},

  descricao: { type: String},

  categoria: { type: String, require: false},

  precoPadrao: { type: String},

  precoPromo: { type: String, required: false },

  subcategoria: { type: String, required: false },

  fornecedor: { type: String},
  
  quantidadeEmEstoque: { type: String},

  quantidadeEmEstoqueMinima: { type: String, default: 1 },

  quantidadeEmEstoqueMaxima: { Type: String },

  codigoBarrasEAN: { type: String},

  codigoBarrasSKU: { type: String, required: false},

  dataValidade: { type: Date},

  imagemProduto: { type: String, require: false},

  dataCadastro: { type: Date, default: Date.now },
  
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Produto', produtoSchema)