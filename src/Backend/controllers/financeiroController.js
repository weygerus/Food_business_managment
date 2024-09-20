const express = require('express')
const mongoose = require('mongoose')

require('../models/fluxoCaixa')
const FluxoCaixa = mongoose.model('FluxoCaixa')

exports.getEntradasByUser = async (req, res) => {

    try {

        const userId = req.params.userId
        const entrada = req.body

        if(!entrada) {

            throw new Error('Não foram encontrados documentos desse usuário!')
        }

        Entrada.find({ userId: userId }).sort({ order: 'desc' }).lean()
        .then((entradas) => {

            const getSuccessMessage = 
                `Entradas encontradas com sucesso!`

            return res.status(200).json({

                message: getSuccessMessage,
                data: entradas
            })
        })
        .catch((err) => {

            return res.status(404).json({

                message: 
                    'Houve um erro ao buscar os documentos de entrada!',
                errorMessage: err
            })
        })
    }
    catch(err) {

        return res.status(500).json({

            message: 
                'Houve um erro em nosso servidor, tente novamente mais tarde!'
        })

    }
}

exports.createEntrada = async (req, res) => {

    try {

        const newEntradaData = req.body

        const newEntrada = new Entrada({
    
            newEntradaData
        })
    
        const savedEntrada = await newEntrada.save()
    
        return res.status(200).json({
    
            message: 
                `Documento de entrada cadastrado com sucesso!`
        })
    }
    catch(err) {

        return res.status(500).json({

            message: 
                `Houve um erro em nosso servidor, tente novamente mais tarde!`
        })
    }
}


exports.updateEntrada = async (req, res) => {

    const entradaToUpdate = req.body 

    const editedEntrada = new Entrada({

        entradaToUpdate
    })

    if(!entradaToUpdate || entradaToUpdate == undefined) {

        const errorMesage = 'Houve um erro ao editar o documento de entrada!'

        const redirectPath = `telaEntradas.html?${errorMessage}`

        window.location.href = redirectPath
    }

    const savedEntrada = await editedEntrada.save()
}

exports.getMovimentacoesByUser = async (req, res) => {

    const userId = req.body.userId

    FluxoCaixa.find({ userId: userId }).sort({ order: 'desc' }).lean()
    .then((movimentacoes) => {

        const successMessage = `Fluxo de caixa encontrado com sucesso!`

        return res.status(200).json({

            message: successMessage,
            data: movimentacoes
        })
    })
    .catch((err) => {

        const errorMessage = `Houve um erro ao buscar as movimentações! message: ${err}`

        return res.status(404).json({

            message: message
        })
    })
}

exports.createMovimentacao = async (req, res) => {

    try {

        const documentData = req.body
    
        const newDocument = new FluxoCaixa({
    
            tipo: documentData.tipo,
            data: documentData.data,
            descricao: documentData.descricao,
            valor: documentData.valor,
            categoria: documentData.categoria,
            userId: documentData.userId
        })

        if(documentData) {
    
            const savedDocument = await newDocument.save()
    
            const successMessage = `Documento criado com sucesso!`
    
            return res.status(200).json({
    
                message: successMessage,
                data: savedDocument
            })
        }
    }
    catch(err) {

        const errorMessage = `Houve um erro ao criar o novo documento, linha 157: ${err}`

        console.log('Teste erro: ', errorMessage)
    
        return res.status(404).json({
    
            message: errorMessage
        })
    }
}

exports.editMovimentacao = async (req, res) => {
    
    try {

        const movimentacaoToUpdate = req.body

        Entrada.findByIdAndUpdate(movimentacaoToUpdate.userId).sort({ order: 'desc' }).lean().
        then(async () => {
                
            const newFluxo = new FluxoCaixa({
        
                tipo: movimentacaoToUpdate.tipo,
                data: movimentacaoToUpdate.data,
                descricao: movimentacaoToUpdate.descricao,
                valor: movimentacaoToUpdate.valor,
                categoria: movimentacaoToUpdate.categoria,
                metodoPagamento: movimentacaoToUpdate.metodoPagamento,
                referenciaId: movimentacaoToUpdate.referenciaId,
                referenciaModel: movimentacaoToUpdate.referenciaModel,
                userId: movimentacaoToUpdate.userId
            })        

            /*

    tipo: { type: String, enum: ['entrada', 'saida'] },
    data: { type: Date },
    descricao: { type: String },
    valor: { type: Number },
    categoria: { type: String },
    metodoPagamento: { type: String },
    referenciaId: { type: mongoose.Schema.Types.ObjectId, refPath: 'referenciaModel' },
    referenciaModel: { type: String, enum: ['Cliente', 'Fornecedor'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

            */
            
            const savedUpdatedFluxo = await newFluxo.save()

            return res.status(200).json({

                message: `Movimentação editada com sucess!`,
                data: savedUpdatedFluxo
            })
        })
        .catch((err) => {

            return res.status(404).json({

                message:
                    `Houve um erro ao buscar a publicação desejada! erro: ${err}`
            })
        })
    
    }
    catch(err) {

        return res.status(500).json({
    
            message: `Houve um erro em nosso servidor, tente novamente mais tarde! erro: ${err}`
        })
    }

    
}