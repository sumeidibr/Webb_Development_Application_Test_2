import { Router } from 'express';
import pedidoController from '../controllers/PedidoController.js';

const router = Router();

router.post('/', pedidoController.createPedido);
router.get('/', pedidoController.getAllPedidos);
router.get('/:id', pedidoController.getPedidoById);
router.put('/:id', pedidoController.updatePedido);
router.delete('/:id', pedidoController.deletePedido);

export default router;
