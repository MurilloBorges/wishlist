import { FilterQuery, Model, Schema } from 'mongoose';
import FavoriteProducts, { IFavoriteProduct } from '../models/FavoriteProducts';

class FavoriteProductsRepository extends Schema<IFavoriteProduct> {
  private model: Model<IFavoriteProduct>;

  constructor() {
    super();
    this.model = FavoriteProducts;
  }

  public async store(favoriteProduct: IFavoriteProduct): Promise<IFavoriteProduct> {
    const result = await this.model.create(favoriteProduct);
    return result;
  }

  /**
   * Método responsável por buscar toda lista de favoritos
   *
   * @public
   * @async
   * @param {FilterQuery<any>} query
   * @returns {Promise<IFavoriteProduct[]>} Promise<IFavoriteProduct[]>
   */
  public async list(
    clientId: string,
    query?: FilterQuery<IFavoriteProduct>,
  ): Promise<IFavoriteProduct[]> {
    const result = await this.model.find({ ...query, client: clientId } || { client: clientId });
    return result;
  }

  public async show(id: string, clientId: string): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOne({ _id: id, client: clientId });
    return result;
  }

  public async showByProduct(
    clientId: string,
    productId: string,
  ): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOne({ productId, client: clientId });
    return result;
  }

  public async delete(id: string, clientId: string): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOneAndDelete({ _id: id, client: clientId });
    return result;
  }

  public async deleteByProduct(
    clientId: string,
    productId: string,
  ): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOneAndDelete({ productId, client: clientId });
    return result;
  }
}

export default FavoriteProductsRepository;
