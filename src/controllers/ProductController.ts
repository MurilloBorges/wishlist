import { Response, Request } from 'express';
import * as Yup from 'yup';
import ProductService from '../services/ProductService';

class ProductController {
  public async index(req: Request, res: Response): Promise<Response> {}

  public async show(req: Request, res: Response): Promise<Response> {}
}
export default new ProductController();
