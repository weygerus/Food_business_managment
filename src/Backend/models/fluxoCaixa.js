const mongoose = require('mongoose')

const fluxoCaixaSchema = new mongoose.Schema({

    tipo: { type: String, enum: ['entrada', 'saida'] },
    data: { type: Date },
    descricao: { type: String },
    valor: { type: Number },
    categoria: { type: String },
    metodoPagamento: { type: String },
    referenciaId: { type: mongoose.Schema.Types.ObjectId, refPath: 'referenciaModel' },
    referenciaModel: { type: String, enum: ['Cliente', 'Fornecedor'] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }

})

module.exports = mongoose.model('FluxoCaixa', fluxoCaixaSchema)