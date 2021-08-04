import validator from 'validator';
import HttpClientChallenge from '../config/HttpClientChallenge';
import { IProductInterface } from '../@types/ProductTypes';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';
import logger from '../log/logger';

export default class ProductService extends HttpClientChallenge {
  private static classInstance?: ProductService;

  /**
   * Método responsável por criar uma nova instância da classe ProductService
   *
   * @public
   * @static
   * @returns {ProductService} ProductService
   */
  public static getInstance(): ProductService {
    if (!this.classInstance) {
      this.classInstance = new ProductService();
    }

    return this.classInstance;
  }

  /**
   * Método responsável por buscar todos os produtos da API,
   * tendo como premissa a páginação da consulta
   *
   * @public
   * @async
   * @param {number} page
   * @returns {Promise<IProductInterface[]>} Promise<IProductInterface[]>
   */
  public async index(page = 1): Promise<IProductInterface[]> {
    let res = null;
    try {
      res = await this.instance.get(`/product/?page=${page}`);
    } catch (error) {
      logger.error('[ProductService][index] error', {
        field: '[ProductService][index]',
        error,
      });
      if (error.response && error.response.status === 404) {
        throw new AppError(404, [IErrors.product.notFoundAll]);
      }
      throw new AppError(500, [IErrors.product.failedToIndex]);
    }
    if (res && res.status === 200 && Object.values(res.data.products).length === 0) {
      throw new AppError(404, [IErrors.product.notFoundAll]);
    }
    return res.data;
  }

  /**
   * Método responsável por buscar um produto na API,
   * tendo como premissa o id do produto para consulta
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<IProductInterface>} Promise<IProductInterface>
   */
  public async show(id: string): Promise<IProductInterface> {
    if (!validator.isUUID(id)) {
      throw new AppError(400, [IErrors.product.invalidId]);
    }

    let res = null;
    try {
      res = await this.instance.get<IProductInterface>(`/product/${id}/`);
    } catch (error) {
      logger.error('[ProductService][show] error', {
        field: '[ProductService][show]',
        product: JSON.stringify({ id }),
        error,
      });
      if (error.response && error.response.status === 404) {
        throw new AppError(404, [IErrors.product.notFoundAll]);
      }
      throw new AppError(500, [IErrors.product.faliedToShow]);
    }

    if (res && res.status === 200 && Object.values(res.data).length === 0) {
      throw new AppError(404, [IErrors.product.notFoundAll]);
    }

    return res.data;
  }
}
