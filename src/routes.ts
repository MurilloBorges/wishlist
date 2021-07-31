import { Router } from 'express';
import Status from './routes/Status.routes';
import Authentication from './routes/Authenticate.routes';
import Client from './routes/Client.routes';
import Product from './routes/Product.routes';

const Routes = Router();

/**
 * Status
 */
Routes.use('/', Status);

/**
 * Authententicate
 */
Routes.use('/authenticate', Authentication);

/**
 * Clients
 */
Routes.use('/clients', Client);

/**
 * Products
 */
Routes.use('/products', Product);

export default Routes;
