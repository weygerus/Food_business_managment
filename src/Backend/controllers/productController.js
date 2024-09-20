const mongoose = require('mongoose')
const Product = require('../models/produto')

require('../models/produto')
const Produto = mongoose.model('Produto')

require('../models/usuario')
const User = mongoose.model('User')

exports.getProductsByUserId = async (req, res) => {

  try {

    const userId = req.params.userId
    
    User.findOne({ _id: userId }).sort({order: 'desc'})
    .then((user) => {

      if(user) {

        Produto.find({ userId: user._id }).sort({ order: 'desc' }).lean()
        .then(async (produtos) => {

              const getSuccessMessage = 
                    `Produtos encontrados com sucesso!`

              console.log('Teste data produto: ', produtos)

              return res.status(200).json({
        
                message: getSuccessMessage,
                data: produtos
              })
          })
          .catch(() => {

            const getErrorMessage = 
                  `Não foram encontrados produtos cadastrados!`


            return res.status(404).json({

              message: getErrorMessage
            })
          })
      }

    })
    .catch((err) => {

      const errorMessage = `Usuário não encontrado! Error: ${err}`

      return res.status(404).json({

        message: errorMessage
      })
    })
  }
  catch(err) {

    return res.status(500).json({

      message: `Houve um erro ao buscar os produtos: ${err}`
    })
  }
}

exports.getProductById = async (req, res) => {

  const userId = req.body.userId

  const productId = req.body.productId

  console.log('Teste productId: ', productId)

  User.findById({ _id: userId })
  .then((user) => {
    
    if(!user) {
      
      const errorMessage = `Houve um erro ao buscar o usuário!`
      
      return res.status(404).json({

        message: errorMessage
      })
    }
    else {

      console.log('Teste parametro: ', productId)
    
      Produto.findById(productId)
      .then((produto) => {
    
        if(produto == null || produto == undefined) {
          
          const errorMessage = `O produto não existe! `
    
          return res.status(404).json({
      
            message: errorMessage
          })
        }
        else if(produto.nome == null || produto.nome == undefined) {
    
          const errorMessage = `${errorMessage} o nome do produto é inválido!`
    
          return res.status(404).json({
      
            message: errorMessage
          })
        }
        else {
    
          const sucessMessage = `Produto encontrado com sucesso!`
    
          console.log('Teste produto response: ', produto)
    
          return res.status(200).json({
    
            message: sucessMessage,
            data: produto
          })
        }
    
      })
    }
})


}

exports.createProduct = async (req, res) => {

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
 
}

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
}


