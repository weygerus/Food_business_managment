const express = require('express')
const mongoose = require('mongoose')

const { registro, login } = require('../controllers/authController')
const { verifyToken, isAdmin } = require('../middleware/authMiddleware')

const router = express.Router()

require('../models/usuario')
const User = mongoose.model('User')

router.get('/teste', async (req, res) => {
  
  return res.status(200).json({ message: 'Ok!' })
})

router.post('/registro', registro, async (req, res) => {


  /*
  try {

    const signUpRequestData = req.body
    
    if(signUpRequestData.username.length < 3) {

      const signupUsernameErrorMessage =
          `Esse nome de usuário é inválido`

      return res.status(400).json({ message: `${signupUsernameErrorMessage}` })
    }

    if(signUpRequestData.password.length < 5) {

      const signupPasswordErrorMessage =
        `Senha inválida, Tente novamente!`

      return res.status(400).json({ message: `${signupPasswordErrorMessage}` })
    }

  }
  catch(err) {

    return res.status(500).json({

      message: `Houve um erro ao cadastrar o novo usuário: ${err}`
    })
  }
  */
})

router.post('/login', login, (req, res) => {})

router.get('/admin', verifyToken, isAdmin, (req, res) => {

  res.json({ message: 'Welcome to the admin panel' })
})

module.exports = router