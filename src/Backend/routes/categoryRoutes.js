
const express = require('express')
const mongoose = require('mongoose')

const router = express.Router()

require('../models/categoria')
const Categoria = mongoose.model('Categoria')

router.get('/getCategorias', async (req, res) => {

    Categoria.find().lean().sort({ order: 'desc'})
    .then((categorias) => {

        console.log('Categorias encontradas!')

        const successGetMessage = `Categorias encontradas!`

        return res.status(200).json({

            message: successGetMessage,
            data: categorias
        })
    })
    .catch((err) => {

        const errorGetMessage = `Houve um erro ao pesquisar as categorias: ${err}`

        console.log(errorGetMessage)

        return res.status(400).json({

            message: errorGetMessage
        })
    })
})

router.post('/createCategory', async (req, res) => {

    const categoryReqBody = req.body

    const newCategory = new Categoria({

        nome: categoryReqBody.nome,
        descricao: categoryReqBody.descricao,
        userId: categoryReqBody.userId
    })

    const savedCategory = await newCategory.save()

    const successCreateMessage = `Categoria criada com sucesso!`

    return res.status(200).json({

        message: successCreateMessage,
        data: savedCategory
    })
})

module.exports = router
