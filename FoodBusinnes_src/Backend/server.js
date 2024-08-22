const express = require('express')
const mongoose = require('mongoose')
const { verifyToken, isAdmin } = require('./middleware/authMiddleware')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')

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

require('./models/productModel')
const Produto = mongoose.model('Produto')

app.use(express.json())

app.use(cors())

app.use('/api/auth', authRoutes)

app.use('/api/products', productRoutes)

// Routes
app.get('api/products/getBasicProductsInfo', async (req, res) => {

    

})

app.post('/createProduct', async (req, res) => {

  const newProductData = req.body

  const newProduct = new Produto({

      nome: newProductData.nome,
      descricao: newProductData.descricao,
      categoria: newProductData.categoria,
      precoPadrao: newProductData.precoPadrao,
      precoPromo: newProductData.precoPromo,
      subcategoria: newProductData.subcategoria,
      fornecedor: newProductData.fornecedor,
      custo: newProductData.custo,
      quantidadeEmEstoque: newProductData.quantidadeEmEstoque,
      quantidadeEmEstoqueMinima: newProductData.quantidadeEmEstoqueMinima,
      quantidadeEmEstoqueMaxima: newProductData.quantidadeEmEstoqueMaxima,
      codigoSKU: newProductData.codigoSKU,
      codigoBarrasEAN: newProductData.codigoBarrasEAN,
      dataValidade: newProductData.dataValidade,
      imagemProduto: newProductData.imagemProduto
  })

  const savedNewProduct = await newProduct.save()

  return res.status(200).json({

      message: `Produto criado com sucesso!`,
      data: savedNewProduct
  })
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