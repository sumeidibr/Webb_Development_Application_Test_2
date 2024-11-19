import db from '../models/index.js';
const Pedido = db.Pedido;

const createPedido = async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllPedidos = async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getPedidoById = async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ message: 'Pedido not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updatePedido = async (req, res) => {
  try {
    const [updated] = await Pedido.update(req.body, {
      where: { pedido_id: req.params.id },
    });
    if (updated) {
      const updatedPedido = await Pedido.findByPk(req.params.id);
      res.status(200).json(updatedPedido);
    } else {
      res.status(404).json({ message: 'Pedido not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deletePedido = async (req, res) => {
  try {
    const deleted = await Pedido.destroy({
      where: { pedido_id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Pedido deleted' });
    } else {
      res.status(404).json({ message: 'Pedido not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createPedido,
  getAllPedidos,
  getPedidoById,
  updatePedido,
  deletePedido
};
