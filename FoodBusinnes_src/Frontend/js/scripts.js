
async function register() {
  
  event.preventDefault()

  const registerUserFetchURL = 
      `http://localhost:3000/api/auth/registro`

  const Username = document.getElementById('username').value

  const Password = document.getElementById('password').value

  const registerPostData = {
    
    username: Username,
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
    /*

     
    */
}