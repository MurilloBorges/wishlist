import HttpClientChallenge from '../config/HttpClientChallenge';
import { IProductInterface } from '../@types/ProductTypes';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';

export default class ProductService extends HttpClientChallenge {
  private static classInstance?: ProductService;

  public static getInstance(): ProductService {
    if (!this.classInstance) {
      this.classInstance = new ProductService();
    }

    return this.classInstance;
  }

  public async index(page = 1): Promise<IProductInterface[]> {
    try {
      const res = await this.instance.get(`/product/?page=${page}`);

      if (res.status !== 200) {
        throw new AppError(200, [IErrors.product.notFoundAll]);
      }
      return res.data;
    } catch (error) {
      throw new AppError(500, [IErrors.product.failedToIndex]);
    }
  }

  public async show(id: string): Promise<IProductInterface> {
    try {
      const res = await this.instance.get<IProductInterface>(`/product/${id}/`);

      if (res.status !== 200) {
        throw new AppError(404, [IErrors.product.notFoundAll]);
      }
      return res.data;
    } catch (error) {
      throw new AppError(500, [IErrors.product.faliedToShow]);
    }
  }
}
