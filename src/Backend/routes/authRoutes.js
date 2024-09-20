const express = require('express')
const mongoose = require('mongoose')

const { registro, login } = require('../controllers/authController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

require('../models/usuario')
const User = mongoose.model('User')

const router = express.Router()

router.post('/registro', registro, async (req, res) => {})

router.post('/login', login, (req, res) => {})

router.post('/logout', verifyToken, (req, res) => {
  
  res.status(200).json({ message: 'Logout bem-sucedido.' });
})

router.get('/admin', verifyToken, isAdmin, (req, res) => {

  res.json({ message: 'Welcome to the admin panel' })
})

module.exports = router