import express from 'express';
import cors from 'cors';
import 'express-async-errors';

import './database';
import routes from './routes';
import errorHandler from './errors/handler';

class App {
  public express: express.Application;

  /**
   * Cosntrutor responsável por habilitar todas as funcionalidades da aplicação
   *
   * @public
   * @constructor
   */
  public constructor() {
    this.express = express();

    this.middlewares();
    this.router();
    this.errors();
  }

  /**
   * Método responsável por habilitar os middlewares da aplicação
   *
   * @private
   * @returns {void} void
   */
  private middlewares(): void {
    this.express.use(express.json({ limit: '25mb' }));
    this.express.use(cors());
  }

  /**
   * Método responsável por habilitar as rotas da aplicação
   *
   * @private
   * @returns {void} void
   */
  private router(): void {
    this.express.use(routes);
  }

  /**
   * Método responsável por habilitar a escuta de lançamento de exceptions da aplicação
   *
   * @private
   * @returns {void} void
   */
  private errors(): void {
    this.express.use(errorHandler);
  }
}

export default new App().express;
