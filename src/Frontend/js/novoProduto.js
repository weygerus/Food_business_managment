async function populateCategorySelectInput() {

    try {

        const response = 
            await fetch('http://localhost:3000/api/categories/getCategorias')

        const responseObject = await response.json()

        const data = responseObject.data

        const select = document.getElementById('categorySelect')
        select.className = 'novoProdutoInput'

        data.forEach(item => {

            const option = document.createElement('option')
            option.textContent = item.nome

            // Adicionando o option ao select
            select.appendChild(option)
        })

    } catch (error) {

        console.error('Erro ao buscar dados da API:', error)
    }
}

async function setNovoProduto() {

    event.preventDefault()

    /* Propriedades */
    const Nome = document.getElementById('nome').value
  
    const Descricao = document.getElementById('descricao').value
  
    const Categoria = document.getElementById('categorySelect').value
  
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
  
    const fetchResponse = await fetch(novoProdutoPostFetchUrl, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProductPostData)
    })
  
    if(!fetchResponse.ok) {
  
      console.log('Não foi possível cadastrar o novo produto!')

      const novoProdutoErrorMessage = `Não foi possível cadastrar o novo produto!`

      window.location.href = `telaProdutos.html?message=${novoProdutoErrorMessage}`
    }
    else {

      const novoProdutoResponseObject = await fetchResponse.json()

      console.log('Teste objeto da response: ', novoProdutoResponseObject)
    }
}

populateCategorySelectInput()
  