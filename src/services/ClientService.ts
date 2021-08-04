/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FilterQuery } from 'mongoose';
import logger from '../log/logger';
import { IClient } from '../models/Clients';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';
import ClientsRepository from '../repositories/ClientsRepository';
import MailService from './mail.service';

export const subject = 'Ativação de conta - Wishlist';
export const emailConfirmationMessage = (name: string, id: string) =>
  `<b style="">Oi ${name}</b> </br></br> Sua conta na Wishlist está quase pronta. Para ativá-la, por favor confirme o seu endereço de e-mail clicando no link abaixo. </br></br> <span><b><a href="http://localhost:3333/clients/${id}/email/confirmation" target="_blank" rel="noopener noreferrer" data-auth="NotApplicable" title="http://localhost:3333/clients/:id/email/confirmation/:confirmation" data-linkindex="0" data-ogsc="" style="color: rgb(228, 159, 255);">Ativar minha conta/Confirmar meu e-mail</a><br></b></span> </br></br> <b style="">Sua conta não será ativada até que seu e-mail seja confirmado.</b> </br></br> <b>Se você não se cadastrou na wishlist recentemente, por favor ignore este email.</b> </br></br> Agradecemos desde já, </br></br> Atenciosamente, Wishlist!`;

class ClientService {
  private static classInstance?: ClientService;

  private repository: ClientsRepository;

  constructor() {
    this.repository = new ClientsRepository();
  }

  /**
   * Método responsável por criar uma nova instância da classe ClientService
   *
   * @public
   * @static
   * @returns {ClientService} ClientService
   */
  public static getInstance(): ClientService {
    if (!this.classInstance) {
      this.classInstance = new ClientService();
    }

    return this.classInstance;
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
    const existsClient = await this.index({ email: client.email });

    if (existsClient.length >= 1) {
      throw new AppError(400, [IErrors.client.exists]);
    }

    let result = null;
    try {
      result = await this.repository.store(client);
    } catch (error) {
      logger.error('[ClientService][store] error', {
        field: '[ClientService][store]',
        client: JSON.stringify(client),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToStore]);
    }

    const mail = new MailService(
      result.email,
      subject,
      emailConfirmationMessage(result.name, result.id as string),
    );
    mail.sendMail();

    return result;
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
   * @param {boolean} skipConfirmation
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async show(id: string, skipConfirmation = false): Promise<IClient | null> {
    let result = null;
    try {
      result = await this.repository.show(id);
    } catch (error) {
      logger.error('[ClientService][show] error', {
        field: '[ClientService][show]',
        client: JSON.stringify({ id }),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToShow]);
    }

    if (!result) {
      throw new AppError(404, [IErrors.client.notFound]);
    }

    if (!skipConfirmation && !result.emailConfirmation) {
      throw new AppError(400, [IErrors.client.notEmailConfirmation]);
    }

    return result;
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

  /**
   * Método responsável por realizar a confirmação de conta do cliente por e-mail
   *
   * @public
   * @async
   * @param {string} id
   * @returns {Promise<IClient | null>} Promise<IClient | null>
   */
  public async emailConfirmation(id: string): Promise<IClient | null> {
    await this.show(id, true);

    try {
      const result = await this.repository.updateEmailConfirmation(id);

      return result;
    } catch (error) {
      logger.error('[ClientService][emailConfirmation] error', {
        field: '[ClientService][emailConfirmation]',
        client: JSON.stringify({ id }),
        error,
      });
      throw new AppError(500, [IErrors.client.failedToEmailConfirmation]);
    }
  }
}

export default ClientService;
