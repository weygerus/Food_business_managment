const mongoose = require('mongoose')
const Product = require('../models/produto')

require('../models/produto')
const Produto = mongoose.model('Produto')

exports.getProductsByUser = async (req, res) => {

  try {

    const userId = req.params.userId

    Produto.find({ userId: userId }).sort({ order: 'desc' }).lean()
    .then((produtos) => {

      const getSuccessMessage = 
            `Produtos encontrados com sucesso!`

      return res.status(200).json({

        message: getSuccessMessage,
        data: produtos
      })
    })
    .catch(() => {

      const getErrorMessage = 
            `Não foram encontrados produtos cadastrados!`

      return res.status(404).json({

        message: getErrorMessage
      })
    })
  }
  catch(err) {

    return res.status(500).json({

      message: `Houve um erro ao buscar os produtos: ${err}`
    })
  }
}

exports.createProduct = async (req, res) => {

  try {

    const productData = req.body

    const newProduct = new Produto({
      nome: productData.nome,
      descricao: productData.descricao,
      categoria: productData.categoria,
      precoPadrao: productData.precoPadrao,
      precoPromo: productData.precoPromo,
      subcategoria: productData.subcategoria,
      fornecedor: productData.fornecedor,
      custo: productData.custo,
      quantidadeEmEstoque: productData.quantidadeEmEstoque,
      quantidadeEmEstoqueMinima: productData.quantidadeEmEstoqueMinima,
      quantidadeEmEstoqueMaxima: productData.quantidadeEmEstoqueMaxima,
      codigoSKU: productData.codigoSKU,
      codigoBarrasEAN: productData.codigoBarrasEAN,
      dataValidade: productData.dataValidade,
      imagemProduto: productData.imagemProduto,
      userId: productData.userId
    })
  
    if(productData.nome == null) {
  
        const createProductErrorMessage = `Forneça um nome de usuário!`
  
        return res.status(400).json({
  
            message: createProductErrorMessage
        })
    }
    else if(productData.categoria == null) {
  
        const createProductErrorMessage = `Selecione um categoria`
  
        return res.status(400).json({
  
          message: createProductErrorMessage
        })
    }
  
    const savedProduct = await newProduct.save()
  
    return res.status(200).json({
  
        message: 'Produto cadastrado com sucesso!',
        data: savedProduct
    })
  }
  catch(err) {

    return res.status(500).json({

      message: `Houver um erro ao criar o produto: ${err}`
    })
  }
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
}


