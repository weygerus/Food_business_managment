async function getProductIdParam() {

  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  return urlParams.get('productId')
}

async function showProductInfoDetail() {

  const productId = await getProductIdParam()

  if(productId != null) {

    const getProductInfoFetchUrl = 
        `http://localhost:3000/api/products/getProductById/${productId}`

    const response = await fetch(getProductInfoFetchUrl)

    if(!response.ok) {

      const reqErrorMessage = `Não foi possivel buscar o produto!`

      window.location.href = `telaProdutos.html?message=${reqErrorMessage}`
    }
    else {

      const responseObject = await response.json()

      const productData = responseObject.data

      const produtoDetalheContainer = 
          document.getElementById('produtoDetalheContainer')

      const produtoDetalheHTML = `
        <h4 class="produtoDetalheTitle">${productData.nome}</h4>

        <div class="produtoDetalheInfo">
        
            <div class="productInfoRow">
            
              <label for="productPrecoPadrao" class="productInfoLabel">Preço padrão:</label>
              <h5 class="productInfoText" id="productPrecoPadrao">${productData.precoPadrao}</h5>
            </div>
            
            <div class="productInfoRow">
                
              <label for="productPrecoPromo" class="productInfoLabel">Preço promocional:</label>
              <p class="productInfoText" id="productPrecoPromo">${productData.precoPromo}</p>
            </div>
            
            <div class="productInfoRow">
                
              <label for="productDesc" class="productInfoLabel">Descrição:</label>
              <p class="productInfoText" id="productDesc">${productData.descricao}</p>
            </div>
            
            <div class="productInfoRow">
        
              <label for="productSubcategoria" class="productInfoLabel">Subcategoria:</label>
              <p class="productInfoText" id="productSubcategoria">${productData.subcategoria}</p>
            </div>
            
            <div class="productInfoRow">
                              
              <label for="productFornecedor" class="productInfoLabel">Fornecedor:</label>
              <p class="productInfoText" id="productFornecedor">${productData.fornecedor}</p>
            </div>
            
            <div class="productInfoRow">
                            
              <label for="productQuantidadeEmEstoque" class="productInfoLabel">Quantidade em estoque:</label>
              <p class="productInfoText" id="productQuantidadeEmEstoque">${productData.quantidadeEmEstoque}</p>
            </div>
            
            <div class="productInfoRow">

              <label for="productQuantidadeMinimaEmEstoque" class="productInfoLabel">Quantidade mínima em estoque:</label>
              <p class="productInfoText" id="productQuantidadeMinimaEmEstoque">${productData.quantidadeEmEstoqueMinima}</p>
            </div>
            
            <div class="productInfoRow">
                
              <label for="productQuantidadeMaximaEmEstoque" class="productInfoLabel">Quantidade mínima em estoque:</label>
              <p class="productInfoText" id="productQuantidadeMaximaEmEstoque">${productData.quantidadeEmEstoqueMaxima}</p>
            </div>
            
            <div class="productInfoRow">
                
              <label for="productCodigoSKU" class="productInfoLabel">Código SKU:</label>
              <p class="productInfoText" id="productCodigoSKU">${productData.codigoSKU}</p>
            </div>
            
            <div class="productInfoRow">
             
              <label for="productCodigoEAN" class="productInfoLabel">Código de barras (EAN):</label>
              <p class="productInfoText" id="productCodigoEAN">${productData.codigoBarrasEAN}</p>
            </div>
            
            <div class="productInfoRow">
              
              <label for="productDataValidade" class="productInfoLabel">Data de validade:</label>
              <p class="productInfoText" id="productDataValidade">${productData.dataValidade}</p>
            </div>
            
              <div class="editBtnContainer">
              
                <button class="editBtn" onclick="getEditProductInfo('${productData}')">
                  <img class="editBtnIcon" src="images/edit.svg" alt="">
                </button>
              </div>
          </div>
            `

      produtoDetalheContainer.innerHTML = produtoDetalheHTML
    }
  }
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

    const response = 
        await fetch('http://localhost:3000/api/products/getProducts')

    const responseObject = await response.json()

    const data = responseObject.data

    const tbody = document.getElementById('bodyTable')

      data.forEach(produto => {
        // Criando uma nova linha
        const tr = document.createElement('tr')

        // Criando e adicionando as células à linha

        const tdNome = document.createElement('td')
        tdNome.textContent = produto.nome
        tr.appendChild(tdNome)

        const tdDesc = document.createElement('td')
        tdDesc.textContent = produto.descricao
        tr.appendChild(tdDesc)

        const tdCategoria = document.createElement('td')
        tdCategoria.textContent = produto.categoria
        tr.appendChild(tdCategoria)

        const tdPreco = document.createElement('td')
        tdPreco.textContent = produto.precoPadrao
        tr.appendChild(tdPreco)

        
        const detailBtnHTML = `
        
            <button class="cadastroProdutosMoreInfoBtn"
                    onclick="getMoreInfo('${produto._id}')">
                Detalhes
            </button>
          `

        const detailBtnContainer = document.createElement('td')
        detailBtnContainer.innerHTML = detailBtnHTML
        tr.appendChild(detailBtnContainer)

        // Adicionando a linha ao tbody
        tbody.appendChild(tr)
    })

  }
  catch(err) {

  }
}

async function getMoreInfo(productId) {

  const encodedProductId = encodeURI(productId)

  window.location.href = `produtoDetalhe.html?productId=${encodedProductId}`
}

async function getNovoProdutoForm() {

  window.location.href = `novoProduto.html`
}

async function populateCategoryInputSelect() {

  const categoryInputSelect = document.getElementById('categoria')

  const getCategoriesFetchUrl = 
      `http://localhost:3000/api/categories/getCategorias`

  const getCategoriesResponse = await fetch(getCategoriesFetchUrl)
  
  if(!getCategoriesResponse.ok) {
    
    const getCategoriesErrorMessage = 
        `Houve um erro ao buscar as categorias!`

    window.location.href = 
        `telaProdutos.html?message=${getCategoriesErrorMessage}`
  }
  else {

    const getCategoriesResponseObject = await getCategoriesResponse.json()

    console.log(getCategoriesResponseObject)

    for(let i = 0; i < getCategoriesResponseObject.data.length; i++) {

      console.log('ok')
    }

    const list = getCategoriesResponseObject.data
    
    const inputSelectHTML = `
    
    <select name="categoryInputSelect" 
            id="categoryInputSelect">
    
            <option value=""></option>
    </select>
  `

    const getCategoriesSuccessMessage = 
        `Categorias recuperadas com sucesso!`

    //window.location.href = 
        //`telaProdutos.html?message=${getCategoriesSuccessMessage}`

  }

}

populateTable()

showProductInfoDetail()
  