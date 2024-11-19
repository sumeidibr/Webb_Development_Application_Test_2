import db from '../models/index.js';
const Categoria = db.Categoria;

const createCategoria = async (req, res) => {
  try {
    const categoria = await Categoria.create(req.body);
    res.status(201).json(categoria);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findByPk(req.params.id);
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ message: 'Categoria not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const [updated] = await Categoria.update(req.body, {
      where: { categoria_id: req.params.id },
    });
    if (updated) {
      const updatedCategoria = await Categoria.findByPk(req.params.id);
      res.status(200).json(updatedCategoria);
    } else {
      res.status(404).json({ message: 'Categoria not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const deleted = await Categoria.destroy({
      where: { categoria_id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Categoria deleted' });
    } else {
      res.status(404).json({ message: 'Categoria not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createCategoria,
  getAllCategorias,
  getCategoriaById,
  updateCategoria,
  deleteCategoria
};
