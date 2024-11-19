import db from '../models/index.js';
const Favoritos = db.Favoritos;

const addFavorito = async (req, res) => {
  try {
    const favorito = await Favoritos.create(req.body);
    res.status(201).json(favorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getFavoritosByUser = async (req, res) => {
  try {
    const favoritos = await Favoritos.findAll({
      where: { id_user: req.params.userId },
    });
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFavorito = async (req, res) => {
  try {
    const deleted = await Favoritos.destroy({
      where: { id_user: req.params.userId, id_livro: req.params.livroId },
    });
    if (deleted) {
      res.status(204).json({ message: 'Favorito removed' });
    } else {
      res.status(404).json({ message: 'Favorito not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addFavorito,
  getFavoritosByUser,
  removeFavorito
};
