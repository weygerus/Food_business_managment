async function populateCategorySelectInput() {

    try {
        
        const user = JSON.parse(localStorage.getItem('user'))
        
        const token = localStorage.getItem('token')

        console.log('Teste chamada linha 9: ', user._id)

        const url = `http://localhost:3000/api/categories/getCategoriesByUser/${user._id}`
      
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        
        if(!response.ok) {

          const errorMessage = `Houve um erro ao buscar as categorias!`

          console.log(response)

          window.location.href = `telaProdutos.html?message=${errorMessage}`
        }
        else {

          const responseObject =  await response.json()
          
          const data = responseObject.data
  
          console.log('Teste data: ', data)
          
          const select = document.getElementById('categorySelect')
          select.className = 'novoProdutoInput'
          
          data.forEach(item => {

            const option = document.createElement('option')
            option.className = "categorySelectOption"
            option.textContent = item.nome
            
            // Adicionando o option ao select
            select.appendChild(option)
          })
        }
    } catch(error) {

      console.error('Erro ao buscar dados da API:', error)
    }
}

 function displayNovoProdutoForm() {

   populateCategorySelectInput()
}

async function setNovoProduto() {

    event.preventDefault()

    /* Propriedades */
    const Nome = document.getElementById('nome').value
  
    const Descricao = document.getElementById('descricao').value
  
    const Categoria = document.getElementById('categorySelect')
  
    const PrecoPadrao = document.getElementById('precoPadrao').value

    const PrecoPromo = document.getElementById('precoPromo').value
  
    const Subcategoria = document.getElementById('subcategoria').value
  
    const Fornecedor = document.getElementById('fornecedor').value
  
    const QuantidadeEmEstoque = document.getElementById('quantidadeEmEstoque').value
  
    const QuantidadeEmEstoqueMinima = document.getElementById('quantidadeEmEstoqueMinima').value
  
    const QuantidadeEmEstoqueMaxima = document.getElementById('quantidadeEmEstoqueMaxima').value
  
    const CodigoSKU = document.getElementById('codigoSKU').value
  
    const CodigoBarrasEAN = document.getElementById('codigoBarrasEAN').value
  
    const DataValidade = document.getElementById('dataValidade').value
  
    const ImagemProduto = document.getElementById('imagemProduto')

    const UserObject = JSON.parse(localStorage.getItem('user'))

    console.log('Teste, linha 95: ', UserObject)
    
    const UserId = UserObject._id
    /* Propriedades */
    
    const novoProdutoPostFetchUrl = 
    `http://localhost:3000/api/products/createProduct`
    
    const newProductPostData = {
  
      nome: Nome,
      descricao: Descricao,
      categoria: Categoria,
      precoPadrao: PrecoPadrao,
      precoPromo: PrecoPromo,
      subcategoria: Subcategoria,
      fornecedor: Fornecedor,
      quantidadeEmEstoque: QuantidadeEmEstoque,
      quantidadeEmEstoqueMinima: QuantidadeEmEstoqueMinima,
      quantidadeEmEstoqueMaxima: QuantidadeEmEstoqueMaxima,
      codigoSKU: CodigoSKU,
      codigoBarrasEAN: CodigoBarrasEAN,
      dataValidade: DataValidade,
      imagemProduto: ImagemProduto,
      dataCadastro: Date.now,
      userId: UserId
    }

    const token = localStorage.getItem('token')
  
    const fetchResponse = await fetch(novoProdutoPostFetchUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(newProductPostData)
    })

    console.log('Teste response: ', fetchResponse)

    if(!fetchResponse.ok || fetchResponse.data == undefined) {

      const errorMessage = fetchResponse.message

      //window.location.href = `novoProduto.html?message=${errorMessage}`
    }
    else {

      const novoProdutoResponseObject = await fetchResponse.json()

      const user = JSON.parse(localStorage.getItem('user'))

      console.log('Teste user:', user)

      console.log('Teste objeto da response: ', novoProdutoResponseObject)
    }
}

  displayNovoProdutoForm()
  