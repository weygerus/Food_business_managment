const mongoose = require('mongoose')

const entregadorSchema = new mongoose.Schema({

    nome: { type: String, required: true },

    sobrenome: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    telefone: { type: String, required: true },

    endereco: {
      rua: { type: String, required: true },
      numero: { type: String, required: true },
      complemento: { type: String },
      bairro: { type: String, required: true },
      cidade: { type: String, required: true },
      estado: { type: String, required: true },
      cep: { type: String, required: true }
    },

    cpf: { type: String, required: true, unique: true },

    rg: { type: String, required: true, unique: true },

    dataNascimento: { type: Date, required: true },

    genero: { type: String },

    dataAdmissao: { type: Date, required: true },

    dataDemissao: { type: Date },

    comissao: { type: Number, required: true },

    dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Entregador', entregadorSchema)