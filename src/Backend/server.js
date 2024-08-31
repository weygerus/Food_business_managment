const express = require('express')
const mongoose = require('mongoose')
const { verifyToken, isAdmin } = require('./middleware/authMiddleware')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')

const app = express()
const PORT = 3000

mongoose.connect('mongodb://localhost:27017/authDB').then(() => {
  
  console.log('Conectado ao MongoDB!')   
})
.catch((err) => {
  
  console.log("Erro de conexão com o banco de dados: " + err)
})

require('./models/usuario')
const User = mongoose.model('User')

require('./models/produto')
const Produto = mongoose.model('Produto')

require('./models/categoria')
const Categoria = mongoose.model('Categoria')

app.use(express.json())

app.use(cors())

app.use('/api/auth', authRoutes)

app.use('/api/products', productRoutes)

app.use('/api/categories', categoryRoutes)

// Routes
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