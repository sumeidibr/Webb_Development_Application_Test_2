import db from '../models/index.js';
const Usuario = db.Usuario;

const createUsuario = async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUsuarioById = async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: 'Usuario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUsuario = async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id_user: req.params.id },
    });
    if (updated) {
      const updatedUsuario = await Usuario.findByPk(req.params.id);
      res.status(200).json(updatedUsuario);
    } else {
      res.status(404).json({ message: 'Usuario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  try {
    const deleted = await Usuario.destroy({
      where: { id_user: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Usuario deleted' });
    } else {
      res.status(404).json({ message: 'Usuario not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario
};
