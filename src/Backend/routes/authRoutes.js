const express = require('express')
const mongoose = require('mongoose')

const { registro, login } = require('../controllers/authController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

require('../models/usuario')
const User = mongoose.model('User')

router.post('/registro', registro, async (req, res) => {})

router.post('/login', login, (req, res) => {})

router.get('/admin', verifyToken, isAdmin, (req, res) => {

  res.json({ message: 'Welcome to the admin panel' })
})

module.exports = router