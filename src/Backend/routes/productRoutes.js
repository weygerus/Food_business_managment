const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

require('../models/produto')
const Produto = mongoose.model('Produto')

router.get('/getBasicProductsInfo', async (req, res) => {

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


module.exports = router