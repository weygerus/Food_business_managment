const User = require('../models/usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registro = async (req, res) => {

  try {
    
    const { username, password } = req.body

    const existingUser = await User.findOne({ username })

    if (existingUser) {

      return res.status(400).json({
        
        message: `${existingUser.username} não está disponivel!` 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const newUser = new User({ username, password: hashedPassword })
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

  const userData = {

    username: req.body.username,
    email: req.body.email
  }

  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' })

  const isMatch = await bcrypt.compare(password, user.password)
  
  if (!isMatch) return res.status(400).json({ message: 'Senha incorreta!' })

  const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' })
  
  return res.json({

    message: "Usuário autenticado com sucesso!",
    token: token,
    user: user
  })
}