import { Router } from 'express';
import itemVendaController from '../controllers/ItemVendaController.js';

const itemVendaRouter = Router();

itemVendaRouter.post('/', itemVendaController.createItemVenda);
itemVendaRouter.get('/', itemVendaController.getAllItensVenda);
itemVendaRouter.get('/:id', itemVendaController.getItemVendaById);
itemVendaRouter.put('/:id', itemVendaController.updateItemVenda);
itemVendaRouter.delete('/:id', itemVendaController.deleteItemVenda);

export default itemVendaRouter;
