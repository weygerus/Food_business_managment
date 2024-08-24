async function register() {
  
  event.preventDefault()

  const registerUserFetchURL = 
      `http://localhost:3000/api/auth/registro`

  const Username = document.getElementById('username').value

  const Email = document.getElementById('email').value

  const Address = document.getElementById('address').value

  const City = document.getElementById('city').value

  const Country = document.getElementById('country').value

  const Password = document.getElementById('password').value

  const registerPostData = {
    
    username: Username,
    email: Email,
    address: Address,
    city: City,
    country: Country,
    password: Password
  }
  
  await fetch(registerUserFetchURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerPostData)
  })
  .then(async (registerPostResponse) => {

    const response = await registerPostResponse.json()

    console.log('response message: ', response.message)

    if(!registerPostResponse.ok) {

      const errorCardHTML = `
        <div class="errorMessageCard">
          <p class="errorMessageText">${response.message}</p>
        </div>

        <style>

          .errorMessageCard {

            width: 200px;


            background-color: #ffe0e0;
            border: 2px solid red;
            height: 60px;
            border-radius: 14px;
            color: red;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .errorMessageText {
            text-align: center;
          }
        </style>
      `
      const registerForm = document.getElementById('card-container') 

      registerForm.innerHTML = errorCardHTML     
    }
    else {
 
        alert(response.message)
        
        window.location.href = 
            `home.html?message=${response.message}&color=green`
    }
  })
}

async function login() {

  event.preventDefault()

  const loginFetchURL = 'http://localhost:3000/api/auth/login'

  const Username = document.getElementById('username').value

  const Password = document.getElementById('password').value

  const loginPostData = {
    
    username: Username,
    password: Password
  }
  
  await fetch(loginFetchURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginPostData)
  })
  .then(async (loginPostResponse) => {

    const response = await loginPostResponse.json()

    console.log('payload: ', response.message)

    if(!loginPostResponse.ok) {

      const errorCardHTML = `
        <div class="errorMessageCard">
          <p class="errorMessageText">${response.message}</p>
        </div>

        <style>

          .errorMessageCard {

            width: 200px;


            background-color: #ffe0e0;
            border: 2px solid red;
            height: 60px;
            border-radius: 14px;
            color: red;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .errorMessageText {
            text-align: center;
          }
        </style>
      `
      const loginForm = document.getElementById('card-container') 

      loginForm.innerHTML = errorCardHTML     
    }
    
    if(response.message == 'Usuário autenticado com sucesso!') {

      const loginSuccessMessage = `Login realizado com sucesso!`
  
      window.location.href = 
          `home.html?message=${loginSuccessMessage}&color=green`
    }
  })
}

async function getCadastroProdutos() {
  
  window.location.href = 'cadastroProdutos.html'
}

async function getNovoProdutoForm() {

  window.location.href = `novoProduto.html`
}

async function setNovoProduto() {

  /* Propriedades */
  const Nome = document.getElementById('nome').value

  const Descricao = document.getElementById('descricao').value

  const Categoria = document.getElementById('categoria').value

  const PrecoPadrao = document.getElementById('precoPadrao').value

  const PrecoPromo = document.getElementById('precoPromo').value

  const Subcategoria = document.getElementById('subcategoria').value

  const Fornecedor = document.getElementById('fornecedor').value

  const Custo = document.getElementById('custo').value

  const QuantidadeEmEstoque = document.getElementById('quantidadeEmEstoque').value

  const QuantidadeEmEstoqueMinima = document.getElementById('quantidadeEmEstoqueMinima').value

  const QuantidadeEmEstoqueMaxima = document.getElementById('quantidadeEmEstoqueMaxima').value

  const CodigoSKU = document.getElementById('codigoSKU').value

  const CodigoBarrasEAN = document.getElementById('codigoBarrasEAN').value

  const DataValidade = document.getElementById('dataValidade').value

  const ImagemProduto = document.getElementById('imagemProduto').value
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
    custo: Custo,
    quantidadeEmEstoque: QuantidadeEmEstoque,
    quantidadeEmEstoqueMinima: QuantidadeEmEstoqueMinima,
    quantidadeEmEstoqueMaxima: QuantidadeEmEstoqueMaxima,
    codigoSKU: CodigoSKU,
    codigoBarrasEAN: CodigoBarrasEAN,
    dataValidade: DataValidade,
    imagemProduto: ImagemProduto
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
  }
}

async function createShowCadastroProdutosTable() {
  
  const getBasicProductsInfoFetchUrl = 
    `http://localhost:3000/api/products/getProducts`

  const getBasicInfoResponse = 
      await fetch(getBasicProductsInfoFetchUrl)

  if(!getBasicInfoResponse.ok) {

    const errorGetProductsResponse = 
        `Houve um erro ao buscar os produtos!`

    window.location.href = 
        `cadastroProdutos.html?message=${errorGetProductsResponse}`
  }
  else {

    const sucessGetProductsResponseObject = await getBasicInfoResponse.json()

    console.log(sucessGetProductsResponseObject)

    const encodedInfoProductsObject = 
        encodeURIComponent(sucessGetProductsResponseObject)
    
    window.location.href = 
        `cadastroProdutos.html?basicInfoProductsData=${encodedInfoProductsObject}`
  }

}

async function getMoreInfo(productId) {

  const getAllProductInfoFetchUrl = 
    `http://localhost:3000/api/products/getAllProductInfo/${productId}`

  const getMoreInfoResponse = await fetch(getAllProductInfoFetchUrl)

  if(!getMoreInfoResponse.ok) {

    console.log('Houve um erro ao buscar a informação do produto!')
  }
  else {

    const getMoreInfoResponseObject = await getMoreInfoResponse.json()

    window.location.href = `allInfoProductPage.html?message=${getMoreInfoResponseObject}`
  }

}
