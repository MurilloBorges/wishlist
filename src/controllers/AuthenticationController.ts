/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import AppError from 'errors/AppError';
import IErrors from 'errors/IErrors';
import { Request, Response } from 'express';
import ClientService from 'services/ClientService';

import authConfig from '../config/auth';
import { generateToken } from '../middlewares/auth';
import logger from '../log/logger';

class AuthenticationController {
  private readonly clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

  /**
   * Método responsável por realizar a autenticação do usuário
   * e a geração do token jwt para acesso aos demais endpoints
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { secret, expiresIn } = authConfig.jwt;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    if (!(await schema.isValid(req.body))) {
      throw new AppError(400, [IErrors.auth.failed]);
    }

    const { email } = req.body;

    try {
      const client = await this.clientService.index({ email });

      if (!client || client.length === 0) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      const token = await generateToken(secret as string, expiresIn, {
        clientId: client[0].id as string,
      });

      logger.info('[AuthenticationController][authenticate] token jwt gerado com sucesso', {
        field: '[AuthenticationController][authenticate]',
        client: JSON.stringify(client[0]),
        token,
      });

      return res.status(200).json({ token });
    } catch (error) {
      logger.info('[AuthenticationController][authenticate] token jwt gerado com sucesso', {
        field: '[AuthenticationController][authenticate]',
        client: JSON.stringify({ email }),
      });
      throw new AppError(500, [IErrors.auth.failedGenerateToken]);
    }
  }

  /**
   * Método responsável por realizar a atualização do token jwt
   *
   * @public
   * @async
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<Response>} Promise<Response>
   */
  public async refreshtoken(req: Request, res: Response): Promise<Response> {
    const { secret, expiresIn } = authConfig.jwt;

    if (!req.clientId) {
      throw new AppError(401, [IErrors.auth.tokenInvalid]);
    }

    const { clientId } = req;

    try {
      const client = await this.clientService.show(clientId);

      if (!client) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      const token = await generateToken(secret as string, expiresIn, { clientId });

      logger.info('[AuthenticationController][refreshtoken] token jwt atualizado com sucesso', {
        field: '[AuthenticationController][refreshtoken]',
        client: JSON.stringify(client),
        token,
      });

      return res.status(200).json({ token });
    } catch (error) {
      logger.info('[AuthenticationController][refreshtoken] token jwt atualizado com sucesso', {
        field: '[AuthenticationController][refreshtoken]',
        client: JSON.stringify({ id: req.clientId }),
      });
      throw new AppError(500, [IErrors.auth.failedRefreshToken]);
    }
  }
}

export default new AuthenticationController();
