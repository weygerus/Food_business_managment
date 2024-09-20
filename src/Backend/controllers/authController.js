const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = '12345'

require('../models/usuario')
const User = mongoose.model('User')


exports.registro = async (req, res) => {

  try {
    
    const { username, password, userImage } = req.body

    const existingUser = await User.findOne({ username })

    if (existingUser) {

      return res.status(400).json({
        
        message: `${existingUser.username} não está disponivel!` 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = new User({ username, password: hashedPassword, userImage: userImage })
    await newUser.save()
    
    return res.status(201).json({

      message: 'Novo usuário criado com sucesso!' 
    })
  }
  catch(err) {

    console.log(err)
  }
}

exports.login = async (req, res) => {

  const { username, password } = req.body
  const user = await User.findOne({ username })

  console.log('Teste data user, linha 49: ', user)

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })

  const isMatch = await bcrypt.compare(password, user.password)
  
  if (!isMatch) return res.status(400).json({ message: 'Senha incorreta!' })

  const acessToken = jwt.sign({
    
     id: user._id, role: user.role }, secret, { expiresIn: '7d' 
  })

  const refreshToken = jwt.sign({ id: user.id }, 'refresh-secret', { expiresIn: '7d' })

  const userData = {
    _id: user._id,
    username: req.body.username,
    userImage: user.userImage
  }

  console.log('Teste token: ', acessToken)

  return res.json({

    message: "Usuário autenticado com sucesso!",
    accessToken: acessToken,
    refreshToken: refreshToken,
    user: userData
  })
}