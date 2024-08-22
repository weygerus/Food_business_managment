const mongoose = require('mongoose')

const produtoSchema = new mongoose.Schema({

  nome: { type: String },

  descricao: { type: String },

  categoria: { type: String },

  precoPadrao: { type: String },

  precoPromo: { type: String },

  subcategoria: { type: String },

  fornecedor: { type: String },

  custo: { type: String },
  
  quantidadeEmEstoque: { type: String },

  quantidadeEmEstoqueMinima: { type: String },

  quantidadeEmEstoqueMaxima: { type: String },
  
  codigoSKU: { type: String },

  codigoBarrasEAN: { type: String },

  dataValidade: { type: String },

  imagemProduto: { type: String }
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

module.exports = mongoose.model('Produto', produtoSchema)