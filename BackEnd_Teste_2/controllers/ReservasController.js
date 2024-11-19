import db from '../models/index.js';
const Reservas = db.Reservas;

const createReserva = async (req, res) => {
  try {
    const reserva = await Reservas.create(req.body);
    res.status(201).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getReservasByUser = async (req, res) => {
  try {
    const reservas = await Reservas.findAll({
      where: { id_user: req.params.userId },
    });
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateReserva = async (req, res) => {
  try {
    const [updated] = await Reservas.update(req.body, {
      where: { id_user: req.params.userId, id_livro: req.params.livroId },
    });
    if (updated) {
      const updatedReserva = await Reservas.findOne({
        where: { id_user: req.params.userId, id_livro: req.params.livroId },
      });
      res.status(200).json(updatedReserva);
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteReserva = async (req, res) => {
  try {
    const deleted = await Reservas.destroy({
      where: { id_user: req.params.userId, id_livro: req.params.livroId },
    });
    if (deleted) {
      res.status(204).json({ message: 'Reserva deleted' });
    } else {
      res.status(404).json({ message: 'Reserva not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createReserva,
  getReservasByUser,
  updateReserva,
  deleteReserva
};
