import { Router } from 'express';
import reservasController from '../controllers/ReservasController.js';

const reservasRouter = Router();

// Rota para criar uma nova reserva
reservasRouter.post('/', reservasController.createReserva);

// Rota para obter todas as reservas de um usuário específico
reservasRouter.get('/user/:userId', reservasController.getReservasByUser);

// Rota para atualizar uma reserva específica de um usuário e livro
reservasRouter.put('/user/:userId/livro/:livroId', reservasController.updateReserva);

// Rota para deletar uma reserva específica de um usuário e livro
reservasRouter.delete('/user/:userId/livro/:livroId', reservasController.deleteReserva);

export default reservasRouter;
