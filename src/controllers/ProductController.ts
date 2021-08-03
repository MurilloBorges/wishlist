import AppError from 'errors/AppError';
import IErrors from 'errors/IErrors';
import { Response, Request } from 'express';
import logger from '../log/logger';
import ProductService from '../services/ProductService';

class ProductController {
  private service: ProductService;

  constructor() {
    this.service = ProductService.getInstance();
  }

  /**
   * Método responsável por listar todos os produtos da API,
   * tendo como premissa a páginação dos mesmos
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async index(req: Request, res: Response): Promise<Response> {
    const { page } = req.query;

    const pag = parseInt(page as string, 10);
    if (page && Number.isNaN(pag)) {
      throw new AppError(400, [IErrors.product.invalidPage]);
    }

    this.service = ProductService.getInstance();
    const products = await this.service.index(page ? pag : 1);

    logger.info('[ProductController][index] produtos listados com sucesso', {
      field: '[ProductController][index]',
      products: JSON.stringify(products),
    });

    return res.status(200).json(products);
  }

  /**
   * Método responsável por listar um produto da API,
   * tendo como premissa o id do produto
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async show(req: Request, res: Response): Promise<Response> {
    this.service = ProductService.getInstance();
    const product = await this.service.show(req.params.id);

    logger.info('[ProductController][show] produto listado com sucesso', {
      field: '[ProductController][show]',
      products: JSON.stringify(product),
    });

    return res.status(200).json(product);
  }
}
export default new ProductController();
