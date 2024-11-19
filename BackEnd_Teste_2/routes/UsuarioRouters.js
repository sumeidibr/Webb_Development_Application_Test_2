import { Router } from 'express';
import usuarioController from '../controllers/UsuarioController.js';

const usuarioRouter = Router();

usuarioRouter.post('/', usuarioController.createUsuario);
usuarioRouter.get('/', usuarioController.getAllUsuarios);
usuarioRouter.get('/:id', usuarioController.getUsuarioById);
usuarioRouter.put('/:id', usuarioController.updateUsuario);
usuarioRouter.delete('/:id', usuarioController.deleteUsuario);

export default usuarioRouter;
