import { Router } from 'express';
import AuthenticationController from '../controllers/AuthenticationController';
import authMiddleware from '../middlewares/auth';

const Authentication = Router();

Authentication.post('/', AuthenticationController.authenticate);
Authentication.get('/refresh', authMiddleware, AuthenticationController.refreshtoken);

export default Authentication;
