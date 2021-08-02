import { Response, Request } from 'express';
import { IFavoriteProduct } from 'models/FavoriteProducts';
import * as Yup from 'yup';
import FavoriteProductService from '../services/FavoriteProductService';

class FavoriteProductController {
  private readonly service: FavoriteProductService;

  constructor() {
    this.service = new FavoriteProductService();
  }

  public async store(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.store({
      client: req.clientId,
      productId: req.params.id,
    } as IFavoriteProduct);

    return res.status(201).json(favoriteProduct);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const favoriteProducts = this.service.index(req.clientId);
    return res.status(200).json(favoriteProducts);
  }

  public async show(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.show(req.clientId, req.params.id);
    return res.status(200).json(favoriteProduct);
  }

  public async showByProduct(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.showByProduct(req.clientId, req.params.id);
    return res.status(200).json(favoriteProduct);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.delete(req.clientId, req.params.id);
    return res.status(204).json(favoriteProduct);
  }

  public async deleteByProduct(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.deleteByProduct(req.clientId, req.params.id);
    return res.status(204).json(favoriteProduct);
  }
}

export default new FavoriteProductController();
