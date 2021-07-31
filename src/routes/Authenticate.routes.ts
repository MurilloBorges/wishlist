import { Router } from 'express';
import OldsRoutesController from '../controllers/OldsRoutesController';
import AuthenticationController from '../controllers/AuthenticationController';
import authMiddleware from '../middlewares/auth';

const Authentication = Router();

Authentication.get('/olds', OldsRoutesController.oldsAuthenticate);

Authentication.post('/', AuthenticationController.authenticate);
Authentication.get('/refresh', authMiddleware, AuthenticationController.refreshtoken);

export default Authentication;
