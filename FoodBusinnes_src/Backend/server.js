const express = require('express')
const mongoose = require('mongoose')
const { verifyToken, isAdmin } = require('./middleware/authMiddleware')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/authDB').then(() => {
  
  console.log('Conectado ao MongoDB!')   
})
.catch((err) => {
  
  console.log("Erro de conexão com o banco de dados: " + err)
})

require('./models/userModel')
const User = mongoose.model('User')

app.use(express.json())

app.use(cors())

app.use('/api/auth', authRoutes)

// Routes

app.post('/registroabc', isAdmin, async (req, res) => {

})

app.post('/login', isAdmin, async(req, res) => {

  try {

    const loginBodyRequest = req.body



    
  }
  catch(err) {

  }
})


app.listen(PORT, () => {

  console.log(`Servidor rodando na porta ${PORT}`)
})