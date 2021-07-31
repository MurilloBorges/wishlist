import { Response, Request } from 'express';
import * as Yup from 'yup';
import ClientService from '../services/ClientService';

class ClientController {
  public async store(req: Request, res: Response): Promise<Response> {
    const Schema = Yup.object().shape({
      name: Yup.string().max(60).required(),
      email: Yup.string().email().max(6).required(),
    });

    await Schema.validate(req.body, {
      abortEarly: false,
    });
  }

  public async index(req: Request, res: Response): Promise<Response> {}

  public async show(req: Request, res: Response): Promise<Response> {}

  public async update(req: Request, res: Response): Promise<Response> {}

  public async delete(req: Request, res: Response): Promise<Response> {}
}
export default new ClientController();
