const express = require('express')
const mongoose = require('mongoose')

require('../models/produto')
const Produto = mongoose.model('Produto')

require('../models/usuario')
const User = mongoose.model('User')

const { getProductsByUserId, getProductById, createProduct }
         = require('../controllers/productController')
         
const { verifyToken, isAdmin } = 
require('../middleware/authMiddleware')

const router = express.Router()

router.get('/getProductsByUserId/:userId', getProductsByUserId)

router.post('/getProductById', getProductById)

router.post('/createProduct', async (req, res) => {

    
    console.log('Teste metodo')

    const product = req.body
  
    if(product.nome == null) {
  
        const createProductErrorMessage = `Forneça um nome de usuário!`
  
        return res.status(400).json({
  
            message: createProductErrorMessage
        })
    }
    else if(product.categoria == null) {
  
        const createProductErrorMessage = `Selecione um categoria`
  
        return res.status(400).json({
  
          message: createProductErrorMessage
        })
      }
      
    if(product.categoria == null || product.categoria == undefined) {


      return res.status(400).json({

        message: `Selecione uma categoria!`
      })
    }

    const newProductData = new Produto({

      nome: product.nome,
      descricao: product.descricao,
      categoria: "teste",
      precoPadrao: product.precoPadrao,
      precoPromo: product.precoPromo,
      subcategoria: product.subcategoria,
      fornecedor: product.fornecedor,
      quantidadeEmEstoque: product.quantidadeEmEstoque,
      quantidadeEmEstoqueMinima: product.quantidadeEmEstoqueMinima,
      quantidadeEmEstoqueMaxima: product.quantidadeEmEstoqueMaxima,
      codigoBarrasEAN: product.codigoBarrasEAN,
      dataValidade: product.dataValidade,
      imagemProduto: product.imagemProduto,
      userId: product.userId
    })


    const savedProduct = await newProductData.save()
  
    return res.status(200).json({
  
        message: 'Produto cadastrado com sucesso!',
        data: savedProduct
    })

})

module.exports = router