import { Response, Request } from 'express';
import ProductService from '../services/ProductService';

class ProductController {
  private readonly service: ProductService;

  constructor() {
    this.service = ProductService.getInstance();
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const products = await this.service.index(parseInt(req.params.page, 10));
    return res.status(200).json(products);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const product = await this.service.show(req.params.id);
    return res.status(200).json(product);
  }
}
export default new ProductController();
