import { Router } from 'express';
import livroController from '../controllers/LivroController.js';

const livroRouter = Router();

// Rota para criar um novo livro
livroRouter.post('/', livroController.createLivro);

// Rota para obter todos os livros
livroRouter.get('/', livroController.getAllLivros);

// Rota para obter um livro específico por ID
livroRouter.get('/:id', livroController.getLivroById);

// Rota para atualizar um livro específico por ID
livroRouter.put('/:id', livroController.updateLivro);

// Rota para deletar um livro específico por ID
livroRouter.delete('/:id', livroController.deleteLivro);
livroRouter.put('/desativar/:id', livroController.indisponibilizarLivro);
livroRouter.put('/ativar/:id', livroController.disponibilizarLivro);

export default livroRouter;
