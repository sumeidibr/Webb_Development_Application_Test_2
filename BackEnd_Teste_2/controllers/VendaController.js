import db from '../models/index.js';
const Venda = db.Venda;

const createVenda = async (req, res) => {
  try {
    const venda = await Venda.create(req.body);
    res.status(201).json(venda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllVendas = async (req, res) => {
  try {
    const vendas = await Venda.findAll();
    res.status(200).json(vendas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVendaById = async (req, res) => {
  try {
    const venda = await Venda.findByPk(req.params.id);
    if (venda) {
      res.status(200).json(venda);
    } else {
      res.status(404).json({ message: 'Venda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateVenda = async (req, res) => {
  try {
    const [updated] = await Venda.update(req.body, {
      where: { id_venda: req.params.id },
    });
    if (updated) {
      const updatedVenda = await Venda.findByPk(req.params.id);
      res.status(200).json(updatedVenda);
    } else {
      res.status(404).json({ message: 'Venda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteVenda = async (req, res) => {
  try {
    const deleted = await Venda.destroy({
      where: { id_venda: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Venda deleted' });
    } else {
      res.status(404).json({ message: 'Venda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createVenda,
  getAllVendas,
  getVendaById,
  updateVenda,
  deleteVenda
};
