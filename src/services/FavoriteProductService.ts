import { FilterQuery } from 'mongoose';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';
import logger from '../log/logger';
import { IFavoriteProduct } from '../models/FavoriteProducts';
import FavoriteProductsRepository from '../repositories/FavoriteProductsRepository';

class FavoriteProductService {
  private repository: FavoriteProductsRepository;

  constructor() {
    this.repository = new FavoriteProductsRepository();
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
    const favoritado = await this.index(favoriteProduct.client, {
      productId: favoriteProduct.productId,
    });

    if (favoritado.length >= 1) {
      throw new AppError(400, [IErrors.favoriteProduct.exists]);
    }

    try {
      const result = await this.repository.store(favoriteProduct);
      return result;
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
  public async index(
    clientId: string,
    query?: FilterQuery<IFavoriteProduct>,
  ): Promise<IFavoriteProduct[]> {
    try {
      const result = await this.repository.list(clientId, query);
      return result;
    } catch (error) {
      logger.error('[FavoriteProductService][index] error', {
        field: '[FavoriteProductService][index]',
        client: JSON.stringify({ id: clientId }),
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
    try {
      const result = await this.repository.show(clientId, id);

      if (!result) {
        throw new AppError(404, [IErrors.favoriteProduct.notFound]);
      }

      return result;
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
    try {
      const result = await this.repository.showByProduct(clientId, id);

      if (!result) {
        throw new AppError(404, [IErrors.favoriteProduct.notFound]);
      }

      return result;
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
    const client = await this.show(clientId, id);

    if (!client) {
      throw new AppError(404, [IErrors.favoriteProduct.notFound]);
    }

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
    const client = await this.showByProduct(clientId, id);

    if (!client) {
      throw new AppError(404, [IErrors.favoriteProduct.notFound]);
    }

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
