
const express = require('express')
const mongoose = require('mongoose')

const { getCategoriesByUser, createCategoria, editCategoryById }
         = require('../controllers/productCategoriaController')
         
const { verifyToken, isAdmin } = 
require('../middleware/authMiddleware')

const router = express.Router()

require('../models/categoria')
const Categoria = mongoose.model('Categoria')

router.get('/getCategoriesByUser/:userId', getCategoriesByUser)

router.post('/createCategory/:userId', createCategoria)

module.exports = router
