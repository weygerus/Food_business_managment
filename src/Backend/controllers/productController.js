const Product = require('../models/produto');

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado.' });
    }
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto.' });
  }
};
