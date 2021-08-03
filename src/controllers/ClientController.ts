import { Response, Request, NextFunction } from 'express';
import * as Yup from 'yup';
import { generateToken } from '../middlewares/auth';
import ClientService from '../services/ClientService';
import authConfig from '../config/auth';
import logger from '../log/logger';
import errorHandler from '../errors/handler';

class ClientController {
  private service: ClientService;

  constructor() {
    this.service = ClientService.getInstance();
  }

  /**
   * Método responsável por realizar a criação de um cliente na base de dados
   * e gerar o token jwt de acesso as APIs
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>} Promise<Response>
   */
  public async store(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().max(60).required(),
      email: Yup.string().email().max(60).required(),
    });

    try {
      await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (error) {
      errorHandler(error, req, res, next);
    }

    this.service = ClientService.getInstance();
    const { id, name, email } = await this.service.store(req.body);

    const { secret, expiresIn } = authConfig.jwt;
    const token = await generateToken(secret as string, expiresIn, {
      clientId: id as string,
    });

    logger.info('[ClientController][store] cliente criado com sucesso', {
      field: '[ClientController][store]',
      client: JSON.stringify({ id, name, email }),
      token,
    });

    return res.status(201).json({
      user: {
        id,
        name,
        email,
      },
      token,
    });
  }

  /**
   * Método responsável por buscar todos os clientes da base,
   * hoje está limitado ao usuário que está acessando a API
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async index(req: Request, res: Response): Promise<Response> {
    this.service = ClientService.getInstance();
    const clients = await this.service.index({ _id: req.clientId });

    logger.info('[ClientController][index] clientes listados com sucesso', {
      field: '[ClientController][index]',
      client: JSON.stringify({ id: req.clientId }),
    });

    return res.status(200).json(clients);
  }

  /**
   * Método responsável por buscar um cliente com base no id fornecido
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async show(req: Request, res: Response): Promise<Response> {
    this.service = ClientService.getInstance();
    const client = await this.service.show(req.params.id);

    logger.info('[ClientController][show] cliente listado com sucesso', {
      field: '[ClientController][show]',
      client: JSON.stringify({ id: req.params.id }),
    });

    return res.status(200).json(client);
  }

  /**
   * Método responsável por atualizar os dados do cliente,
   * hoje está liberado apenas o nome do cliente para atualização
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @param {NextFunction} next
   * @returns {Promise<Response>} Promise<Response>
   */
  public async update(req: Request, res: Response, next: NextFunction): Promise<Response> {
    const schema = Yup.object().shape({
      name: Yup.string().max(60).required(),
    });

    try {
      await schema.validate(req.body, {
        abortEarly: false,
      });
    } catch (error) {
      errorHandler(error, req, res, next);
    }

    const { name } = req.body;

    this.service = ClientService.getInstance();
    const client = await this.service.updateName(req.params.id, name);

    logger.info('[ClientController][update] cliente atualizado com sucesso', {
      field: '[ClientController][update]',
      client: JSON.stringify(client),
    });

    return res.status(200).json({ client });
  }

  /**
   * Método responsável por excluir um cliente da base de dados
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async delete(req: Request, res: Response): Promise<Response> {
    this.service = ClientService.getInstance();
    await this.service.delete(req.params.id);

    logger.info('[ClientController][delete] cliente excluído com sucesso', {
      field: '[ClientController][delete]',
      client: JSON.stringify({ id: req.params.id }),
    });

    return res.status(204).json();
  }
}
export default new ClientController();
