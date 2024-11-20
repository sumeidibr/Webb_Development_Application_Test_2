import { Router } from 'express';
import favoritoController from '../controllers/FavoritoController.js';

const favoritoRouter = Router();

// Rota para adicionar um favorito
favoritoRouter.post('/', favoritoController.addFavorito);

// Rota para obter todos os favoritos de um usuário específico
favoritoRouter.get('/:userId', favoritoController.getFavoritosByUser);

// Rota para remover um favorito de um usuário específico por livro
favoritoRouter.delete('/:userId/:livroId', favoritoController.removeFavorito);

export default favoritoRouter;
