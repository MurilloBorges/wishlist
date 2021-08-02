import { FilterQuery, Model, Schema } from 'mongoose';
import Clients, { IClient } from '../models/Clients';

class ClientsRepository extends Schema<IClient> {
  private model: Model<IClient>;

  constructor() {
    super();
    this.model = Clients;
  }

  public async store(client: IClient): Promise<IClient> {
    const result = await this.model.create(client);
    return result;
  }

  /**
   * Método responsável por buscar todos os clientes da base
   *
   * @public
   * @async
   * @param {FilterQuery<any>} query
   * @returns {Promise<IClient[]>} Promise<IClient[]>
   */
  public async list(query?: FilterQuery<IClient>): Promise<IClient[]> {
    const result = await this.model.find(query || {});
    return result;
  }

  public async show(id: string): Promise<IClient | null> {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  public async update(id: string, client: IClient): Promise<IClient | null> {
    const result = await this.model.findOneAndUpdate({ _id: id }, { client }, { new: true });
    return result;
  }

  public async updateName(id: string, name: string): Promise<IClient | null> {
    const result = await this.model.findOneAndUpdate({ _id: id }, { name }, { new: true });
    return result;
  }

  public async delete(id: string): Promise<IClient | null> {
    const result = await this.model.findOneAndDelete({ _id: id });
    return result;
  }
}

export default ClientsRepository;
