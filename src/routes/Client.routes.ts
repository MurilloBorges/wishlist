import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import ClientController from '../controllers/ClientController';

const Client = Router();

Client.post('/', ClientController.store);
Client.get('/', authMiddleware, ClientController.index);
Client.get('/:id', authMiddleware, ClientController.show);
Client.patch('/:id', authMiddleware, ClientController.update);
Client.delete('/:id', authMiddleware, ClientController.delete);

export default Client;
