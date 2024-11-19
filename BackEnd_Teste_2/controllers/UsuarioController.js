import db from '../models/index.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const Usuario = db.Usuario;

const createUsuario = async (req, res) => {
  try {
        // Criptografa a senha antes de salvar
        const hashedPassword = await bcrypt.hash(req.body.senha, 10);
        const usuario = await Usuario.create({ ...req.body, senha: hashedPassword });
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


const loginUser = async (req, res) => {
  const { email, password } = req.body; // Certifique-se de que 'password' é extraído corretamente

  if (!password || !email) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Busca o usuário pelo email
    const user = await Usuario.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compara a senha fornecida com a senha criptografada no banco de dados
    const isPasswordValid = await bcrypt.compare(password, user.senha);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { id: user.id_user, email: user.email, tipo_usuario: user.tipo_usuario },
      'sua_chave_secreta_aqui',
      { expiresIn: '1h' }
    );

    // Responde com sucesso e o token gerado
    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id_user,
        nome: user.nome,
        email: user.email,
        tipo_usuario: user.tipo_usuario
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



export default {
  createUsuario,
  getAllUsuarios,
  getUsuarioById,
  updateUsuario,
  deleteUsuario,
  loginUser
};
