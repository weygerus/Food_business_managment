 function getProductIdParam() {

    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    return urlParams.get('productId')
  }

async function showProductInfoDetail() {

    const productId = getProductIdParam()
    
    console.log('Teste productId, linha 12: ', productId)
    
    const token = localStorage.getItem('token')
    
    const user = JSON.parse(localStorage.getItem('user'))

    const getProductData = {

        userId: user._id,
        productId: productId
    }
    
    const url = 
    `http://localhost:3000/api/products/getProductById`
  
    const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(getProductData)
      })
    
    if(!response.ok) {

        console.log('Teste parametro: ', response.message)
        
        const reqErrorMessage = `Não foi possivel buscar o produto!`
        
        window.location.href = `telaProdutos.html?message=${reqErrorMessage}`
      }
      else {
          
        const responseObject = await response.json()
          
        const productData = responseObject.data
  
        const produtoDetalheContainer = 
            document.getElementById('produtoDetalheContainer')
  
        const produtoDetalheHTML = `

<div class="container mt-5">

<h3 class="page-title custom-page-title">Detalhes do produto:</h3>

   <div class="card custom-card">
   
   <img src="${productData.imagemProduto}" class="card-img-top custom-image" alt="Imagem do Produto">
   
        <div class="card-body custom-card-body">

                <h5 class="card-title custom-card-title">${productData.nome}</h5>

                <p class="card-text custom-card-text"><strong>Descrição: </strong>${productData.descricao}</p>

                <p class="card-text custom-card-text"><strong>Categoria: </strong>${productData.categoria}</p>

                <p class="card-text custom-card-text"><strong>Preço padrão: </strong>${productData.precoPadrao}</p>

                <p class="card-text custom-card-text"><strong>Preço promocional: </strong>${productData.precoPromo}</p>

                <p class="card-text custom-card-text"><strong>Subcategoria: </strong>${productData.subcategoria}</p>

                <p class="card-text custom-card-text"><strong>Fornecedor: </strong>${productData.subcategoria}</p>

                <p class="card-text custom-card-text"><strong>Preço Padrão: </strong>${productData.quantidadeEmEstoque}</p>

                <p class="card-text custom-card-text"><strong>Preço Promocional: </strong>${productData.fornecedor}</p>

                <p class="card-text custom-card-text"><strong>Quantidade em Estoque: </strong>${productData.quantidadeEmEstoque}</p>

                <p class="card-text custom-card-text"><strong>Quantidade Mínima em Estoque: </strong>${productData.quantidadeEmEstoqueMinima}</p>

                <p class="card-text custom-card-text"><strong>Quantidade Máxima em Estoque: </strong>${productData.quantidadeEmEstoqueMaxima}</p>

                <p class="card-text custom-card-text"><strong>Código de Barras EAN: </strong>${productData.codigoBarrasEAN}</p>

                <p class="card-text custom-card-text"><strong>Código de Barras SKU: </strong>${productData.codigoBarrasSKU}</p>

                <p class="card-text custom-card-text"><strong>Data de Validade: </strong>${productData.dataValidade}</p>

                <p class="card-text custom-card-text"><strong>Data de Cadastro: </strong>${productData.dataCadastro}</p>

                <p class="card-text custom-card-text"><strong>ID do Usuário: </strong></p>


            </div>
        </div>
    </div>

     


    `
  
        produtoDetalheContainer.innerHTML = produtoDetalheHTML
      }
    }

showProductInfoDetail()
  