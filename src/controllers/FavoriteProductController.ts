import { Response, Request } from 'express';
import { IFavoriteProduct } from 'models/FavoriteProducts';
import FavoriteProductService from '../services/FavoriteProductService';

class FavoriteProductController {
  private readonly service: FavoriteProductService;

  constructor() {
    this.service = new FavoriteProductService();
  }

  /**
   * Método responsável por adicionar um produto a lista de favoritos
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async store(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.store({
      client: req.clientId,
      productId: req.params.id,
    } as IFavoriteProduct);

    return res.status(201).json(favoriteProduct);
  }

  /**
   * Método responsável por listar todos os produtos da lista de favoritos,
   * tem como premissa o id do cliente
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const favoriteProducts = this.service.index(req.clientId);
    return res.status(200).json(favoriteProducts);
  }

  /**
   * Método responsável por buscar um produto da lista de favoritos,
   * tem como premissa o id do favorito
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async show(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.show(req.clientId, req.params.id);
    return res.status(200).json(favoriteProduct);
  }

  /**
   * Método responsável por buscar um produto da lista de favoritos,
   * tem como premissa o id do produto
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async showByProduct(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.showByProduct(req.clientId, req.params.id);
    return res.status(200).json(favoriteProduct);
  }

  /**
   * Método responsável por excluir um produto da lista de favoritos,
   * tem como premissa o id do favorito
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.delete(req.clientId, req.params.id);
    return res.status(204).json(favoriteProduct);
  }

  /**
   * Método responsável por excluir um produto da lista de favoritos,
   * tem como premissa o id do favorito
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async deleteByProduct(req: Request, res: Response): Promise<Response> {
    const favoriteProduct = this.service.deleteByProduct(req.clientId, req.params.id);
    return res.status(204).json(favoriteProduct);
  }
}

export default new FavoriteProductController();
