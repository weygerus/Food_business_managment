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

    console.log('payload: ', response)

    if(!loginPostResponse.ok) {

      const errorCardHTML = `
        <div class="errorMessageCard">
          <p class="errorMessageText">${response.message}</p>
        </div>

        <style>

          .errorMessageCard {

            width: 200px;


            background-color: #ffe0e0;
            border: 1px solid red;
            height: 60px;
            border-radius: 0px;
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
    
    if(response.token) {

      localStorage.setItem('token', response.token);
      localStorage.setItem('message', response.message);
      localStorage.setItem('user', JSON.stringify(response.user));
  
      window.location.href = 
          `home.html`
    }
  })
}

function signOut() {
  
    console.log('teste')

  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = 'login.html';
}

async function logout() {

  const user = JSON.parse(localStorage.getItem('user'))
  
  const token = localStorage.getItem('token')

  console.log(token)

  await fetch('http://localhost:3000/api/auth/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data.message === 'Logout bem-sucedido.') {

      console.log(data.message)

      signOut();
    } else {
      console.error('Erro ao fazer logout:', data.message);
    }
  })
  .catch(error => console.error('Erro:', error));

}


async function getCadastroProdutos() {
  
  window.location.href = 'telaProdutos.html'
}

async function getNovoProdutoForm() {

  window.location.href = `novoProduto.html`
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
