const mongoose = require('mongoose')

const fornecedorSchema = new mongoose.Schema({
    nomeEmpresa: { type: String, required: true },
    cnpj: { type: String, required: true, unique: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    endereco: {
      rua: { type: String, required: true },
      numero: { type: String, required: true },
      complemento: { type: String },
      bairro: { type: String, required: true },
      cidade: { type: String, required: true },
      estado: { type: String, required: true },
      cep: { type: String, required: true }
    },
    nomeContato: { type: String, required: true },
    telefoneContato: { type: String, required: true },
    emailContato: { type: String, required: true },
    produtosFornecidos: [{ type: String }],
    dataCadastro: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Fornecedor', fornecedorSchema)