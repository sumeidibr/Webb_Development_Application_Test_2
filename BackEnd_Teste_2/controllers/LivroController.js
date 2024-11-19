import db from '../models/index.js';
const Livro = db.Livro;

const createLivro = async (req, res) => {
  try {
    const livro = await Livro.create(req.body);
    res.status(201).json(livro);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllLivros = async (req, res) => {
  try {
    const livros = await Livro.findAll();
    res.status(200).json(livros);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLivroById = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);
    if (livro) {
      res.status(200).json(livro);
    } else {
      res.status(404).json({ message: 'Livro not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLivro = async (req, res) => {
  try {
    const [updated] = await Livro.update(req.body, {
      where: { id_livro: req.params.id },
    });
    if (updated) {
      const updatedLivro = await Livro.findByPk(req.params.id);
      res.status(200).json(updatedLivro);
    } else {
      res.status(404).json({ message: 'Livro not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteLivro = async (req, res) => {
  try {
    const deleted = await Livro.destroy({
      where: { id_livro: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Livro deleted' });
    } else {
      res.status(404).json({ message: 'Livro not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para disponibilizar o livro (alterar o status para "ativo")
const disponibilizarLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);

    if (livro) {
      livro.status = 'ativo'; // Alterando o status para 'ativo'
      await livro.save(); // Salvando a alteração no banco de dados

      res.status(200).json({ message: 'Livro disponibilizado com sucesso!', livro });
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Método para indisponibilizar o livro (alterar o status para "inativo")
const indisponibilizarLivro = async (req, res) => {
  try {
    const livro = await Livro.findByPk(req.params.id);

    if (livro) {
      livro.status = 'inativo'; // Alterando o status para 'inativo'
      await livro.save(); // Salvando a alteração no banco de dados

      res.status(200).json({ message: 'Livro indisponibilizado com sucesso!', livro });
    } else {
      res.status(404).json({ message: 'Livro não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  createLivro,
  getAllLivros,
  getLivroById,
  updateLivro,
  deleteLivro,
  disponibilizarLivro,
  indisponibilizarLivro
};
