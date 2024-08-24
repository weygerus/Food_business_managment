const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

require('../models/produto')
const Produto = mongoose.model('Produto')

router.get('/getProducts', async (req, res) => {

    Produto.find().sort({ order: 'desc' }).lean()
    .then((produtos) => {

        const sucessMessage = `Produtos encontrados com sucesso!`

        console.log('Teste produtos: ', produtos)

        return res.status(200).json({

            message: sucessMessage,
            data: produtos
        })
    })
    .catch((err) => {

        const errorMessage = `Houve um erro ao buscar os produtos: ${err}`

        return res.status(404).json({

            message: errorMessage
        })
    })
})

router.post('/createProduct', async (req, res) => {

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

    const savedProduct = await newProduct.save()

    return res.status(200).json({

        message: 'Produto cadastrado com sucesso!',
        data: savedProduct
    })
})


module.exports = router