const express = require('express')
const mongoose = require('mongoose')

const { createEntrada, getEntradasByUser, getMovimentacoesByUser, createMovimentacao, editMovimentacao }
         = require('../controllers/financeiroController')

const { verifyToken, isAdmin } = 
        require('../middleware/authMiddleware')

const router = express.Router()

require('../models/financeiro/Entrada')
const Entrada = mongoose.model('Entrada')

require('../models/financeiro/Saida')
const Saida = mongoose.model('Saida')

require('../models/fluxoCaixa')
const FluxoCaixa = mongoose.model('FluxoCaixa')

router.get('/getEntradas', verifyToken, getEntradasByUser)

router.post('/createEntrada', verifyToken, createEntrada)

router.post('/saidas', verifyToken)

// Fluxo caixa

router.get('/getMovimentacoes', verifyToken, getMovimentacoesByUser)

router.post('/createMovimentacao', verifyToken, createMovimentacao)

router.post('/editMovimentacao', verifyToken, editMovimentacao)

module.exports = router