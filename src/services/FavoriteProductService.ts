import Constants from 'constants/Constants';
import { FilterQuery } from 'mongoose';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';
import logger from '../log/logger';
import { IFavoriteProduct } from '../models/FavoriteProducts';
import FavoriteProductsRepository from '../repositories/FavoriteProductsRepository';
import ProductService from './ProductService';

class FavoriteProductService {
  private static classInstance?: FavoriteProductService;

  private repository: FavoriteProductsRepository;

  private productService: ProductService;

  constructor() {
    this.repository = new FavoriteProductsRepository();
    this.productService = ProductService.getInstance();
  }

  /**
   * Método responsável por criar uma nova instância da classe FavoriteProductService
   *
   * @public
   * @static
   * @returns {FavoriteProductService} FavoriteProductService
   */
  public static getInstance(): FavoriteProductService {
    if (!this.classInstance) {
      this.classInstance = new FavoriteProductService();
    }

    return this.classInstance;
  }

  /**
   * Método responsável por adicionar um produto a lista de favoritos
   * tendo como premissa o id do cliente e o id do produto
   *
   * @public
   * @async
   * @param {IFavoriteProduct} favoriteProduct
   * @returns {Promise<IFavoriteProduct} Promise<IFavoriteProduct>
   */
  public async store(favoriteProduct: IFavoriteProduct): Promise<IFavoriteProduct> {
    const favoritado = await this.index({
      client: favoriteProduct.client,
      productId: favoriteProduct.productId,
    });

    if (favoritado.length >= 1) {
      throw new AppError(400, [IErrors.favoriteProduct.exists]);
    }

    await this.productService.show(favoriteProduct.productId as string);

    try {
      const result = await this.repository.store(favoriteProduct);

      return {
        _id: result.id,
        preview: `${Constants.HOST}/products/${result.productId}`,
        client: result.client,
        productId: result.productId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      } as IFavoriteProduct;
    } catch (error) {
      logger.error('[FavoriteProductService][store] error', {
        field: '[FavoriteProductService][store]',
        favoriteProduct: JSON.stringify(favoriteProduct),
        client: JSON.stringify({ id: favoriteProduct.client }),
        error,
      });
      throw new AppError(500, [IErrors.favoriteProduct.failedToStore]);
    }
  }

  /**
   * Método responsável por listar todos os produtos da lista de favoritos
   * tendo como premissa o id do cliente na requisição
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {FilterQuery<IFavoriteProduct>} query
   * @returns {Promise<IFavoriteProduct[]} Promise<IFavoriteProduct[]>
   */
  public async index(query?: FilterQuery<IFavoriteProduct>): Promise<IFavoriteProduct[]> {
    try {
      let result = await this.repository.list(query);
      if (result.length >= 1) {
        result = result.map(data => ({
          _id: data.id,
          preview: `${Constants.HOST}/products/${data.productId}`,
          createdAt: data.createdAt,
        })) as IFavoriteProduct[];
      }

      return result;
    } catch (error) {
      logger.error('[FavoriteProductService][index] error', {
        field: '[FavoriteProductService][index]',
        client: JSON.stringify({ id: query?.client }),
        favoriteProduct: JSON.stringify(query),
        error,
      });
      throw new AppError(500, [IErrors.favoriteProduct.failedToIndex]);
    }
  }

  /**
   * Método responsável por excluir um produto da lista de favoritos
   * tendo como premissa o id do cliente e o id do favorito
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} id
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async show(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    const result = await this.repository.show(clientId, id);

    if (!result) {
      throw new AppError(404, [IErrors.favoriteProduct.notFound]);
    }

    try {
      return {
        _id: result.id,
        preview: `${Constants.HOST}/products/${result.productId}`,
        client: result.client,
        productId: result.productId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      } as IFavoriteProduct;
    } catch (error) {
      logger.error('[FavoriteProductService][show] error', {
        field: '[FavoriteProductService][show]',
        client: JSON.stringify({ id: clientId }),
        favoriteProduct: JSON.stringify({ id }),
        error,
      });
      throw new AppError(500, [IErrors.favoriteProduct.failedToShow]);
    }
  }

  /**
   * Método responsável por buscar um produto da lista de favoritos
   * tendo como premissa o id do cliente e o id do produto
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} id
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async showByProduct(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    const result = await this.repository.showByProduct(clientId, id);

    if (!result) {
      throw new AppError(404, [IErrors.favoriteProduct.notFound]);
    }

    try {
      return {
        _id: result.id,
        preview: `${Constants.HOST}/products/${result.productId}`,
        client: result.client,
        productId: result.productId,
        createdAt: result.createdAt,
        updatedAt: result.updatedAt,
      } as IFavoriteProduct;
    } catch (error) {
      logger.error('[FavoriteProductService][showByProduct] error', {
        field: '[FavoriteProductService][showByProduct]',
        client: JSON.stringify({ id: clientId }),
        favoriteProduct: JSON.stringify({ productId: id }),
        error,
      });
      throw new AppError(500, [IErrors.favoriteProduct.failedToShow]);
    }
  }

  /**
   * Método responsável por excluir um produto da lista de favoritos
   * tendo como premissa o id do cliente e o id do favorito
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} id
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async delete(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    await this.show(clientId, id);

    try {
      const result = await this.repository.delete(clientId, id);
      return result;
    } catch (error) {
      logger.error('[FavoriteProductService][delete] error', {
        field: '[FavoriteProductService][delete]',
        client: JSON.stringify({ id: clientId }),
        favoriteProduct: JSON.stringify({ id }),
        error,
      });
      throw new AppError(500, [IErrors.favoriteProduct.failedToDelete]);
    }
  }

  /**
   * Método responsável por excluir um produto da lista de favoritos
   * tendo como premissa o id do cliente e o id do produto
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} id
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async deleteByProduct(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    await this.showByProduct(clientId, id);

    try {
      const result = await this.repository.deleteByProduct(clientId, id);
      return result;
    } catch (error) {
      logger.error('[FavoriteProductService][deleteByProduct] error', {
        field: '[FavoriteProductService][deleteByProduct]',
        client: JSON.stringify({ id: clientId }),
        favoriteProduct: JSON.stringify({ productId: id }),
        error,
      });
      throw new AppError(500, [IErrors.favoriteProduct.failedToDelete]);
    }
  }
}

export default FavoriteProductService;
