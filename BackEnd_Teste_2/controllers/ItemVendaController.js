import db from '../models/index.js';
const ItemVenda = db.ItemVenda;

const createItemVenda = async (req, res) => {
  try {
    const itemVenda = await ItemVenda.create(req.body);
    res.status(201).json(itemVenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllItensVenda = async (req, res) => {
  try {
    const itensVenda = await ItemVenda.findAll();
    res.status(200).json(itensVenda);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getItemVendaById = async (req, res) => {
  try {
    const itemVenda = await ItemVenda.findByPk(req.params.id);
    if (itemVenda) {
      res.status(200).json(itemVenda);
    } else {
      res.status(404).json({ message: 'ItemVenda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateItemVenda = async (req, res) => {
  try {
    const [updated] = await ItemVenda.update(req.body, {
      where: { id_item: req.params.id },
    });
    if (updated) {
      const updatedItemVenda = await ItemVenda.findByPk(req.params.id);
      res.status(200).json(updatedItemVenda);
    } else {
      res.status(404).json({ message: 'ItemVenda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteItemVenda = async (req, res) => {
  try {
    const deleted = await ItemVenda.destroy({
      where: { id_item: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'ItemVenda deleted' });
    } else {
      res.status(404).json({ message: 'ItemVenda not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createItemVenda,
  getAllItensVenda,
  getItemVendaById,
  updateItemVenda,
  deleteItemVenda
};
