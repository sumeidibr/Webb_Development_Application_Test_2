import db from '../models/index.js';
const Favorito = db.Favorito;

const addFavorito = async (req, res) => {
  try {
    const favorito = await Favorito.create(req.body);
    res.status(201).json(favorito);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllFavoritos = async (req, res) => {
  try {
    const favoritos = await Favorito.findAll();
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteFavorito = async (req, res) => {
  try {
    const deleted = await Favorito.destroy({
      where: { favorito_id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Favorito deleted' });
    } else {
      res.status(404).json({ message: 'Favorito not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  addFavorito,
  getAllFavoritos,
  deleteFavorito
};
