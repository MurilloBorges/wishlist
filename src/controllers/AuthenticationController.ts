/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import AppError from 'errors/AppError';
import IErrors from 'errors/IErrors';
import { Request, Response } from 'express';
import ClientService from 'services/ClientService';

import authConfig from '../config/auth';
import { generateToken } from '../middlewares/auth';

class AuthenticationController {
  private readonly clientService: ClientService;

  constructor() {
    this.clientService = new ClientService();
  }

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

      return res.status(200).json({ token });
    } catch (error) {
      throw new AppError(500, [IErrors.auth.failedGenerateToken]);
    }
  }

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

      return res.status(200).json({ token });
    } catch (error) {
      throw new AppError(500, [IErrors.auth.failedRefreshToken]);
    }
  }
}

export default new AuthenticationController();
