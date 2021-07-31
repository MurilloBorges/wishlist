import AppError from 'errors/AppError';
import IErrors from 'errors/IErrors';
import { IClient } from 'models/Clients';
import { FilterQuery } from 'mongoose';
import ClientsRepository from '../repositories/ClientsRepository';

class ClientService {
  private repository: ClientsRepository;

  constructor() {
    this.repository = new ClientsRepository();
  }

  public async store(client: IClient): Promise<IClient> {
    try {
      const result = await this.repository.store(client);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.client.failedToStore]);
    }
  }

  public async index(query?: FilterQuery<IClient>): Promise<IClient[]> {
    try {
      const result = await this.repository.list(query);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.client.failedToIndex]);
    }
  }

  public async show(id: string): Promise<IClient | null> {
    try {
      const result = await this.repository.show(id);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.client.failedToShow]);
    }
  }

  public async update(id: string, client: IClient): Promise<IClient | null> {
    try {
      const result = await this.repository.update(id, client);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.client.failedToUpdate]);
    }
  }

  public async delete(id: string): Promise<IClient | null> {
    try {
      const result = await this.repository.delete(id);
      return result;
    } catch (error) {
      throw new AppError(500, [IErrors.client.failedToDelete]);
    }
  }
}

export default ClientService;
