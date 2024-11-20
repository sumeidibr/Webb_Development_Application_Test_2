import db from '../models/index.js';
const Reservas = db.Reservas;
const Livros = db.Livro; // Agora usando Livros

const createReserva = async (req, res) => {
  const { id_livro, quantidade } = req.body;

  try {
    // Inicia uma transação para garantir que ambas as operações (criação e atualização) ocorram juntas
    const result = await db.sequelize.transaction(async (t) => {
      // Cria a reserva
      const reserva = await Reservas.create(req.body, { transaction: t });

      // Busca o livro associado ao id_livro
      const livro = await Livros.findOne({ where: { id_livro }, transaction: t });

      if (!livro) {
        throw new Error('Livro não encontrado.');
      }

      // Verifica se há quantidade suficiente em estoque
      if (livro.quantidade < quantidade) {
        throw new Error('Quantidade insuficiente em estoque.');
      }

      // Atualiza a quantidade em estoque
      await Livros.update(
        { quantidade: livro.quantidade - quantidade },
        { where: { id_livro }, transaction: t }
      );

      return reserva;
    });

    res.status(201).json(result);
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
    // Busca e deleta a reserva usando o id_reserva
    const deleted = await Reservas.destroy({
      where: { id_reserva: req.params.id_reserva }, // Usando o id_reserva para identificar a reserva
    });

    if (deleted) {
      res.status(204).json({ message: 'Reserva deletada com sucesso' });
    } else {
      res.status(404).json({ message: 'Reserva não encontrada' });
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
