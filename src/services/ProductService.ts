import { AxiosPromise } from 'axios';
import HttpClientChallenge from '../config/HttpClientChallenge';
import { IProductInterface } from '../@types/ProductTypes';

export default class ProductService extends HttpClientChallenge {
  private static classInstance?: ProductService;

  public static getInstance(): ProductService {
    if (!this.classInstance) {
      this.classInstance = new ProductService();
    }

    return this.classInstance;
  }

  public show = (page: number): AxiosPromise =>
    this.instance.get<IProductInterface[]>(`/product/?page=${page}`);

  public index = (id: string): AxiosPromise =>
    this.instance.get<IProductInterface>(`/product/${id}/`);
}
