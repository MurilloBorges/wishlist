/* eslint-disable no-underscore-dangle */
import * as Yup from 'yup';
import AppError from 'errors/AppError';
import IErrors from 'errors/IErrors';
import { Request, Response } from 'express';
import ClientService from 'services/ClientService';

import authConfig from '../config/auth';
import { generateToken } from '../middlewares/auth';

const validateError = (res: Response, status?: number, msg?: string): Response => {
  return res
    .status(status || 400)
    .json({ errors: [{ error: msg || 'Objeto de autenticação inválido' }] });
};
class AuthenticationController {
  public async authenticate(req: Request, res: Response): Promise<Response> {
    const { secret, expiresIn } = authConfig.jwt;

    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    await schema.validate(req.body, {
      abortEarly: false,
    });

    const { email } = req.body;

    try {
      const clientService = new ClientService();
      const client = await clientService.index({ email });

      if (!client || client.length === 0) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      const token = await generateToken(secret as string, expiresIn, {
        clientId: client[0].id as string,
      });

      return res.status(200).json({ token });
    } catch (error) {
      return validateError(res);
    }
  }

  public async refreshtoken(req: Request, res: Response): Promise<Response> {
    const { secret, expiresIn } = authConfig.jwt;

    if (!req.clientId) {
      return validateError(res, 401, 'Token inválido');
    }

    const { clientId } = req;

    try {
      const clientService = new ClientService();
      const client = await clientService.show(clientId);

      if (!client) {
        throw new AppError(404, [IErrors.client.notFound]);
      }

      const token = await generateToken(secret as string, expiresIn, { clientId });

      return res.status(200).json({ token });
    } catch (error) {
      return validateError(res, 401, 'Token inválido');
    }
  }
}

export default new AuthenticationController();
