import { FilterQuery, Model, Schema } from 'mongoose';
import Clients, { IClient } from '../models/Clients';

class ClientsRepository extends Schema<IClient> {
  private model: Model<IClient>;

  constructor() {
    super();
    this.model = Clients;
  }

  /**
   * Método responsável por criar um cliente na base de dados
   *
   * @public
   * @async
   * @param {IClient} client
   * @returns {Promise<IClient>} Promise<IClient>
   */
  public async store(client: IClient): Promise<IClient> {
    const result = await this.model.create(client);
    return result;
  }

  /**
   * Método responsável por buscar todos os clientes da base de dados
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

  /**
   * Método responsável por buscar um cliente da base de dados,
   * tendo como premissa o id do cliente
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async show(id: string): Promise<IClient | null> {
    const result = await this.model.findOne({ _id: id });
    return result;
  }

  /**
   * Método responsável por atualizar um cliente na base de dados,
   * tendo como premissa o id do cliente e o objeto do cliente
   *
   * @public
   * @async
   * @param {string} id
   * @param {IClient} client
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async update(id: string, client: IClient): Promise<IClient | null> {
    const result = await this.model.findOneAndUpdate({ _id: id }, { client }, { new: true });
    return result;
  }

  /**
   * Método responsável por atualizar o nome do cliente na base de dados,
   * tendo como premissa o id do cliente e o nome
   *
   * @public
   * @async
   * @param {string} id
   * @param {string} name
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async updateName(id: string, name: string): Promise<IClient | null> {
    const result = await this.model.findOneAndUpdate({ _id: id }, { name }, { new: true });
    return result;
  }

  /**
   * Método responsável por ativar a conta do cliente na base de dados,
   * tendo como premissa o id do cliente
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async updateEmailConfirmation(id: string): Promise<IClient | null> {
    const result = await this.model.findOneAndUpdate(
      { _id: id },
      { emailConfirmation: true },
      { new: true },
    );
    return result;
  }

  /**
   * Método responsável por excluir um cliente da base de dados,
   * tendo como premissa o id do cliente
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async delete(id: string): Promise<IClient | null> {
    const result = await this.model.findOneAndDelete({ _id: id });
    return result;
  }
}

export default ClientsRepository;
