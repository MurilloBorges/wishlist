import { FilterQuery } from 'mongoose';
import logger from '../log/logger';
import { IClient } from '../models/Clients';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';
import ClientsRepository from '../repositories/ClientsRepository';

class ClientService {
  private repository: ClientsRepository;

  constructor() {
    this.repository = new ClientsRepository();
  }

  /**
   * Método responsável por realizar a criação de um cliente na base de dados
   *
   * @public
   * @async
   * @param {IClient} client
   * @returns {Promise<IClient>} Promise<IClient>
   */
  public async store(client: IClient): Promise<IClient> {
    try {
      const existsClient = await this.index({ email: client.email });

      if (existsClient.length >= 1) {
        throw new AppError(400, [IErrors.client.exists]);
      }

      const result = await this.repository.store(client);
      return result;
    } catch (error) {
      logger.error('[ClientService][store] error', {
        field: '[ClientService][store]',
        client: JSON.stringify(client),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToStore]);
    }
  }

  /**
   * Método responsável por listar todos os clientes da base de dados,
   * tendo como premissa uma query de filtro, hoje está travada apenas
   * para o cliente que está acessando a API
   *
   * @public
   * @async
   * @param {FilterQuery<IClient>} query
   * @returns {Promise<IClient[]>} Promise<IClient[]>
   */
  public async index(query?: FilterQuery<IClient>): Promise<IClient[]> {
    try {
      const result = await this.repository.list(query);
      return result;
    } catch (error) {
      logger.error('[ClientService][index] error', {
        field: '[ClientService][index]',
        client: JSON.stringify(query),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToIndex]);
    }
  }

  /**
   * Método responsável por realizar a busca de um cliente na base de dados,
   * tendo como premissa o id do cliente
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async show(id: string): Promise<IClient | null> {
    try {
      const result = await this.repository.show(id);

      if (!result) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      return result;
    } catch (error) {
      logger.error('[ClientService][show] error', {
        field: '[ClientService][show]',
        client: JSON.stringify({ id }),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToShow]);
    }
  }

  /**
   * Método responsável por realizar a atualização de um cliente na base de dados
   *
   * @public
   * @async
   * @param {string} id
   * @param {IClient} client
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async update(id: string, client: IClient): Promise<IClient | null> {
    try {
      const existsClient = await this.show(id);

      if (!existsClient) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      const result = await this.repository.update(id, client);

      return result;
    } catch (error) {
      logger.error('[ClientService][update] error', {
        field: '[ClientService][update]',
        client: JSON.stringify({ ...client, id }),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToUpdate]);
    }
  }

  /**
   * Método responsável por realizar a atualização do nome de um cliente na base de dados
   *
   * @public
   * @async
   * @param {string} id
   * @param {string} name
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async updateName(id: string, name: string): Promise<IClient | null> {
    try {
      const client = await this.show(id);

      if (!client) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      const result = await this.repository.updateName(id, name);

      return result;
    } catch (error) {
      logger.error('[ClientService][updateName] error', {
        field: '[ClientService][updateName]',
        client: JSON.stringify({ id, name }),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToUpdate]);
    }
  }

  /**
   * Método responsável por realizar a exclusão de um cliente na base de dados
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async delete(id: string): Promise<IClient | null> {
    try {
      const client = await this.show(id);

      if (!client) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      const result = await this.repository.delete(id);
      return result;
    } catch (error) {
      logger.error('[ClientService][delete] error', {
        field: '[ClientService][delete]',
        client: JSON.stringify({ id }),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToDelete]);
    }
  }
}

export default ClientService;
