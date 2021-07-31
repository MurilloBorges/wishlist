import { Response, Request } from 'express';
import mongoose from 'mongoose';

class DatabaseHealth {
  /**
   * Método responsável por obter o status da aplicação
   * e o status de conexão com o banco de dados
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async datahealth(req: Request, res: Response): Promise<Response> {
    let isError = false;
    let mongoResult;
    try {
      mongoResult = mongoose.connection.readyState;
      if (mongoResult === 0 || mongoResult === 3) {
        throw new Error('check status database error');
      }
    } catch (err) {
      isError = true;
    }
    const status = isError ? 500 : 200;
    return res.status(status).json({
      status: {
        database: mongoose.STATES[mongoose.connection.readyState],
        application: 'running',
      },
    });
  }
}
export default new DatabaseHealth();
