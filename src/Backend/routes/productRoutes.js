const express = require('express')
const mongoose = require('mongoose')
const productController = require('../controllers/productController')

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

router.get('/getProductById/:id', async (req, res) => {

    try {

        const productId = req.params.id

        Produto.findOne({ _id: productId })
        .then((produto) => {

            const successGetProductMessage = `Produto encontrado com sucesso!`

            return res.status(200).json({

                message: successGetProductMessage,
                data: produto
            })
        })
        .catch((err) => {

            const errorGetProductMessage = 
                `Não foi possivel encontrar esse produto! Erro: ${err}`

            return res.status(400).json({

                message: errorGetProductMessage
            })
        })
    }
    catch(err) {

    }
})

router.get('/getProductsByUser/:userId', productController.getProductsByUser)

router.post('/createProduct', productController.createProduct)

router.post('/editProduct/:id', productController.updateProduct)

module.exports = router