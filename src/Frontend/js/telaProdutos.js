async function getProductIdParam() {

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('productId')
}

async function getEditProductInfo(productData) {

  const editProdutoDetalheContainerEan = document.getElementById('productCodigoEAN')
  const editProdutoDetalheContainerSKU = document.getElementById('productCodigoSKU')

  const editProdutoDetalheHTML = `

    <input type="text" class="editProductTextInput" placeholder="${productData.nome}">
  `

  editProdutoDetalheContainerEan.innerHTML = editProdutoDetalheHTML
  editProdutoDetalheContainerSKU.innerHTML = editProdutoDetalheHTML

}

async function populateTable() {

  try {

  const user = JSON.parse(localStorage.getItem('user'))

  const response =  
  await fetch(`http://localhost:3000/api/products/getProductsByUserId/${user._id}`)
    
  const responseObject = await response.json()

  const data = responseObject.data
      
  const tbody = document.getElementById('bodyTable')

  data.forEach(produto => {

        const tr = document.createElement('tr')

        const tdNome = document.createElement('td')
        tdNome.textContent = produto.nome
        tr.appendChild(tdNome)
        
        const tdDesc = document.createElement('td')
        tr.appendChild(tdDesc)
        
        const tdCategoria = document.createElement('td')
        tdCategoria.textContent = produto.categoria
        tr.appendChild(tdCategoria)
        
        const tdPreco = document.createElement('td')
        tdPreco.textContent = produto.precoPadrao
        tr.appendChild(tdPreco)

        console.log('Teste iteração: ', produto)   
        
        if(!produto.nome) {

          return
        }
        
        const detailBtnHTML = `
        
            <button class="cadastroProdutosMoreInfoBtn"
                    onclick="getMoreInfo('${produto._id}')">
                Detalhes
            </button>
          `
          
        
          const detailBtnContainer = document.createElement('td')
          detailBtnContainer.innerHTML = detailBtnHTML
          tr.appendChild(detailBtnContainer)

          tbody.appendChild(tr)
          
    })  
          
  }
  catch(err) {

    const errorMessage = `Houve um erro durante a busca da tabela! Error: ${err}`

   window.location.href = `home.html?${errorMessage}`
  }
    
}

async function getMoreInfo(productId) {

  window.location.href = `produtoDetalhe.html?productId=${productId}`
}


async function getNovoProdutoForm() {

  window.location.href = `novoProduto.html`
}

populateTable()






  