import { Router } from 'express';
import categoriaController from '../controllers/CategoriaController.js';

const router = Router();

router.post('/', categoriaController.createCategoria);
router.get('/', categoriaController.getAllCategorias);
router.get('/:id', categoriaController.getCategoriaById);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

export default router;
