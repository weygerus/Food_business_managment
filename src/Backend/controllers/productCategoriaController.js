const mongoose = require('mongoose')
const Product = require('../models/categoria')

require('../models/categoria')
const Categoria = mongoose.model('Categoria')

require('../models/usuario')
const User = mongoose.model('User')

exports.getCategoriesByUser = async (req, res) => {

    try {

        const userId = req.params.userId

        User.findById({ _id: userId })
        .then((user) => {

            if(user) {
    
                console.log('Teste user: ', user)
    
                Categoria.find({ userId: userId }).sort({order: 'desc' }).lean()
                .then((categorias) => {
            
                    console.log('Teste busca: ', categorias)
    
                    const successMessage = `Categorias encontradas com sucesso!`
            
                    return res.status(200).json({
            
                        message: successMessage,
                        data: categorias
                    })
                })
                .catch((err) => {
        
                    
                    console.log('Teste erro: ', err)
            
                    const errorMessage = `Houve um erro ao buscaar as categorias! Erro: ${err}`
            
                    return res.status(404).json({
            
                        message: errorMessage
                    })
                })
            }
        })
    }
    catch(err) {

        console.log('Teste erro: ', err)

        return res.status(500).json({

            message: `Houve um erro em nosso servidor, tente novamente mais tarde! Erro: ${err}`
        })
    }
}

exports.createCategoria = async (req, res) => {

    try {
        
        const categoryData = req.body

        const userId = req.params.userId

        Categoria.findOne({ userId: userId})
        const category = 
            await Categoria.findOne({nome: userId})
            
        if (category) {

            return res.status(400).json({

                message: `Essa categoria já existe!`
            })
        }
        else {

            if(categoryData != null){
        
                const newCategory = new Categoria({
        
                    nome: categoryData.nome,
                    descricao: categoryData.descricao
                })
        
                const savedCategory = await newCategory.save()
        
                return res.status(200).json({
        
                    message: `Categoria registrada com sucesso!`,
                    data: savedCategory
                })
        
            }
            else {
        
                return res.status(400).json({
        
                    message: `Estrutura de dados inesperada!`
                })
            }
        }
    }
    catch(err) {

        return res.status(500).json({

            message: `Algo deu errado, tente novamente mais tarde! Erro: ${err}`
        })
    }
}

exports.editCategoryById = async (req, res) => {
    
    try {

        const categoryToEditData = req.body

        console.log('Teste id: ', categoryToEditData.userId)
    
        const categoryExists = Categoria.findById(categoryToEditData.userId)
    
        if(!categoryExists) {
    
            const editedCategory = new Categoria({
    
                noome: categoryData.nome,
                descricao: categoryData.descricao,
                dataCadastro: categoryData.dataCadastro,
                userId: categoryData.userId
            })
    
            const savedCategory = await editedCategory.save()
    
            return res.status(200).json({
    
                message: `Categoria editada com sucesso!`,
                data: savedCategory
            })
        }
    }
    catch(err) {

        return res.status(500).json({

            message: `Houve um erro em nosso servidor, tente novamente mais tarde! Erro: ${err}`
        })
    }
}