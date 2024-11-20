import { Router } from 'express';
import vendaController from '../controllers/VendaController.js';

const vendaRouter = Router();

vendaRouter.post('/', vendaController.createVenda);
vendaRouter.get('/', vendaController.getAllVendas);
vendaRouter.get('/:id', vendaController.getVendaById);
vendaRouter.put('/:id', vendaController.updateVenda);
vendaRouter.delete('/:id', vendaController.deleteVenda);
vendaRouter.delete('/finalizar-compra', vendaController.finalizarCompra);

export default vendaRouter;
