import { Router } from 'express';
import favoritoController from '../controllers/FavoritoController.js';

const router = Router();

router.post('/', favoritoController.addFavorito);
router.get('/', favoritoController.getAllFavoritos);
router.delete('/:id', favoritoController.deleteFavorito);

export default router;
