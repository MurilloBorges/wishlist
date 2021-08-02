import AppError from 'errors/AppError';
import IErrors from 'errors/IErrors';
import { IFavoriteProduct } from 'models/FavoriteProducts';
import { FilterQuery } from 'mongoose';
import FavoriteProductsRepository from 'repositories/FavoriteProductsRepository';

class FavoriteProductService {
  private repository: FavoriteProductsRepository;

  constructor() {
    this.repository = new FavoriteProductsRepository();
  }

  public async store(favoriteProduct: IFavoriteProduct): Promise<IFavoriteProduct> {
    try {
      const favoritado = await this.index(favoriteProduct.client, {
        productId: favoriteProduct.productId,
      });

      if (favoritado.length >= 1) {
        throw new AppError(400, [IErrors.favoriteProduct.exists]);
      }

      const result = await this.repository.store(favoriteProduct);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.favoriteProduct.failedToStore]);
    }
  }

  public async index(
    clientId: string,
    query?: FilterQuery<IFavoriteProduct>,
  ): Promise<IFavoriteProduct[]> {
    try {
      const result = await this.repository.list(clientId, query);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.favoriteProduct.failedToIndex]);
    }
  }

  public async show(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    try {
      const result = await this.repository.show(clientId, id);

      if (!result) {
        throw new AppError(404, [IErrors.favoriteProduct.notFound]);
      }

      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.favoriteProduct.failedToShow]);
    }
  }

  public async showByProduct(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    try {
      const result = await this.repository.showByProduct(clientId, id);

      if (!result) {
        throw new AppError(404, [IErrors.favoriteProduct.notFound]);
      }

      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.favoriteProduct.failedToShow]);
    }
  }

  public async delete(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    try {
      const client = await this.show(clientId, id);

      if (!client) {
        throw new AppError(404, [IErrors.favoriteProduct.notFound]);
      }

      const result = await this.repository.delete(clientId, id);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.favoriteProduct.failedToDelete]);
    }
  }

  public async deleteByProduct(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    try {
      const client = await this.showByProduct(clientId, id);

      if (!client) {
        throw new AppError(404, [IErrors.favoriteProduct.notFound]);
      }

      const result = await this.repository.deleteByProduct(clientId, id);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.favoriteProduct.failedToDelete]);
    }
  }
}

export default FavoriteProductService;
