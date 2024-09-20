const express = require('express')
const mongoose = require('mongoose')
const { verifyToken, isAdmin } = require('./middleware/authMiddleware')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const financeiroRoutes = require('./routes/financeiroRoutes')

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

app.use('/api/financeiro', financeiroRoutes)

// Routes
app.post('/login', isAdmin, async(req, res) => {

  try {

    const loginBodyRequest = req.body



    
  }
  catch(err) {

  }
})

app.post('/newProduct', async (req, res) => {
  
  console.log('Teste metodo')

  const product = req.body

  if(product.nome == null) {

      const createProductErrorMessage = `Forneça um nome de usuário!`

      return res.status(400).json({

          message: createProductErrorMessage
      })
  }
  else if(product.categoria == null) {

      const createProductErrorMessage = `Selecione um categoria`

      return res.status(400).json({

        message: createProductErrorMessage
      })
    }
    
  if(product.categoria == null || product.categoria == undefined) {


    return res.status(400).json({

      message: `Selecione uma categoria!`
    })
  }

  const newProductData = new Produto({

    nome: product.nome,
    descricao: product.descricao,
    categoria: "teste",
    precoPadrao: product.precoPadrao,
    precoPromo: product.precoPromo,
    subcategoria: product.subcategoria,
    fornecedor: product.fornecedor,
    quantidadeEmEstoque: product.quantidadeEmEstoque,
    quantidadeEmEstoqueMinima: product.quantidadeEmEstoqueMinima,
    quantidadeEmEstoqueMaxima: product.quantidadeEmEstoqueMaxima,
    codigoBarrasEAN: product.codigoBarrasEAN,
    dataValidade: product.dataValidade,
    imagemProduto: product.imagemProduto,
    userId: product.userId
  })


  const savedProduct = await newProductData.save()

  return res.status(200).json({

      message: 'Produto cadastrado com sucesso!',
      data: savedProduct
  })

})

app.listen(PORT, () => {

  console.log(`Servidor rodando na porta ${PORT}`)
})