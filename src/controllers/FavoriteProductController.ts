import { Response, Request } from 'express';
import * as Yup from 'yup';
import FavoriteProductService from '../services/FavoriteProductService';

class FavoriteProductController {
  public async store(req: Request, res: Response): Promise<Response> {
    const Schema = Yup.object().shape({
      productId: Yup.number().required(),
    });

    await Schema.validate(req.params, {
      abortEarly: false,
    });
  }

  public async index(req: Request, res: Response): Promise<Response> {}

  public async show(req: Request, res: Response): Promise<Response> {}

  public async showByProduct(req: Request, res: Response): Promise<Response> {}

  public async update(req: Request, res: Response): Promise<Response> {}

  public async delete(req: Request, res: Response): Promise<Response> {}
}
export default new FavoriteProductController();
