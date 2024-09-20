const receitaSchema = new mongoose.Schema({
    data: { type: Date, default: Date.now },
    descricao: String,
    valor: { type: Number, required: true },
    categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Categoria' }
});

const Receita = mongoose.model('Receita', receitaSchema)