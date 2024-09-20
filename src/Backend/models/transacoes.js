const mongoose = require('mongoose')

const transacaoSchema = new mongoose.Schema({
    data: { type: Date, default: Date.now },

    descricao: String,

    tipo: { type: String, enum: ['entrada', 'saida'], required: true },

    valor: { type: Number, required: true },
    
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
});

const Transacao = mongoose.model('Transacao', transacaoSchema);