const mongoose = require('mongoose')

const funcionarioSchema = new mongoose.Schema({

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

    cargo: { type: String, required: true },

    salario: { type: Number, required: true },

    dataAdmissao: { type: Date, required: true },

    dataDemissao: { type: Date },

    senha: { type: String, required: true },
    
    permissoes: { type: [String], required: true }, // Ex.: ['ver_produtos', 'editar_produtos']
    
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Dono do estabelecimento

    dataCadastro: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Funcionario', funcionarioSchema)