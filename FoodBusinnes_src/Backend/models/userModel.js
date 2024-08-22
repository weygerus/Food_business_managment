const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

  username: { type: String, required: true, unique: true },

  email: { type: String, required: true, unique: true },

  address: { type: String, required: true, unique: true },

  city: { type: String, required: true, unique: true },

  country: { type: String, required: true, unique: true },

  password: { type: String, required: true },

  confirmPassword: { type: String, required: true, unique: true },

  role: { type: Number, default: 1 },

})

/*
                     
                        <th class="cadastroProdutosHeader">Subcategoria</th>
                        <th class="cadastroProdutosHeader">Preço Padrão</th>
                        <th class="cadastroProdutosHeader">Preço Promo</th>
                        <th class="cadastroProdutosHeader">Fornecedor</th>
                        <th class="cadastroProdutosHeader">Custo Compra</th>
                        <th class="cadastroProdutosHeader">Quantidade em Estoque</th>
                        <th class="cadastroProdutosHeader">Estoque Mínimo</th>
                        <th class="cadastroProdutosHeader">Estoque Máximo</th>
                        <th class="cadastroProdutosHeader">Código do produto (SKU)</th>
                        <th class="cadastroProdutosHeader">Código de Barras (EAN/GTIN)</th>
                        <th class="cadastroProdutosHeader">Data de Validade</th>
                        <th class="cadastroProdutosHeader">Imagens do Produto</th>
*/

module.exports = mongoose.model('User', userSchema)