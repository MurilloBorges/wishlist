import { FilterQuery, Model, Schema } from 'mongoose';
import FavoriteProducts, { IFavoriteProduct } from '../models/FavoriteProducts';

class FavoriteProductsRepository extends Schema<IFavoriteProduct> {
  private model: Model<IFavoriteProduct>;

  constructor() {
    super();
    this.model = FavoriteProducts;
  }

  /**
   * Método responsável por adicionar um produto a lista de favoritos
   *
   * @public
   * @async
   * @param {IFavoriteProduct} favoriteProduct
   * @returns {Promise<IFavoriteProduct>} Promise<IFavoriteProduct>
   */
  public async store(favoriteProduct: IFavoriteProduct): Promise<IFavoriteProduct> {
    const result = await this.model.create(favoriteProduct);
    return result;
  }

  /**
   * Método responsável por buscar toda a lista de favoritos
   *
   * @public
   * @async
   * @param {FilterQuery<any>} query
   * @returns {Promise<IFavoriteProduct[]>} Promise<IFavoriteProduct[]>
   */
  public async list(query?: FilterQuery<IFavoriteProduct>): Promise<IFavoriteProduct[]> {
    const result = await this.model.find(query || {});
    return result;
  }

  /**
   * Método responsável por buscar um produto da lista de favoritos,
   * tendo como premissa o id do favorito e o id do cliente
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} id
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async show(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOne({ _id: id, client: clientId });
    return result;
  }

  /**
   * Método responsável por buscar um produto da lista de favoritos,
   * tendo como premissa o id do produto e o id do cliente
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} productId
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async showByProduct(
    clientId: string,
    productId: string,
  ): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOne({ productId, client: clientId });
    return result;
  }

  /**
   * Método responsável por buscar um produto da lista de favoritos,
   * tendo como premissa o id do favorito e o id do cliente
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} productId
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async delete(clientId: string, id: string): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOneAndDelete({ _id: id, client: clientId });
    return result;
  }

  /**
   * Método responsável por excluir um produto da lista de favoritos,
   * tendo como premissa o id do produto e o id do cliente
   *
   * @public
   * @async
   * @param {string} clientId
   * @param {string} productId
   * @returns {Promise<IFavoriteProduct | null>} Promise<IFavoriteProduct | null>
   */
  public async deleteByProduct(
    clientId: string,
    productId: string,
  ): Promise<IFavoriteProduct | null> {
    const result = await this.model.findOneAndDelete({ productId, client: clientId });
    return result;
  }
}

export default FavoriteProductsRepository;
