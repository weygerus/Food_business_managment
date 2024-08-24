const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/authDB').then(() => {

    console.log("Conectado ao banco de dados!")
})
.catch((err) => {

    console.log("Erro de conexão com o banco de dados: " + err)
})

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error:'))

db.once('open', () => {

  console.log('Connected to MongoDB')
})