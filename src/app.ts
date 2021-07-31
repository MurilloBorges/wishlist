import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import './database';
import routes from './routes';
import errorHandler from './errors/handler';

class App {
  public express: express.Application;

  public constructor() {
    this.express = express();

    this.middlewares();
    this.router();
    this.errors();
  }

  private middlewares(): void {
    this.express.use(express.json({ limit: '25mb' }));
    this.express.use(cors());
  }

  private router(): void {
    this.express.use(routes);
  }

  private errors(): void {
    this.express.use(errorHandler);
  }
}

export default new App().express;
