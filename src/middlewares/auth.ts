import AppError from 'errors/AppError';
import IErrors from 'errors/IErrors';
import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import authConfig from '../config/auth';
import logger from '../log/logger';

export async function generateToken(
  appSecret: string,
  expires: string,
  params: {
    clientId: string;
  },
): Promise<string> {
  try {
    const secret = <jwt.Secret>appSecret;

    const token = jwt.sign(params, secret, {
      expiresIn: expires,
    });

    return token;
  } catch (error) {
    throw new AppError(500, [IErrors.auth.failedGenerateToken]);
  }
}

export function decodeToken(
  token: string,
  ignoreExpiration = false,
): { clientId: string; exp: number } {
  try {
    const secret = <jwt.Secret>authConfig.jwt.secret;
    const data = jwt.verify(token, secret, { ignoreExpiration });

    return data as { clientId: string; exp: number };
  } catch (error) {
    throw new AppError(401, [IErrors.auth.expiredToken]);
  }
}

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): any {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(401, [IErrors.auth.jwt]);
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    throw new AppError(401, [IErrors.auth.tokenInvalid]);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme) || !token) {
    throw new AppError(401, [IErrors.auth.tokenInvalid]);
  }

  const data = decodeToken(token, req.originalUrl === '/authenticate/refresh');

  req.clientId = data.clientId;

  logger.info('jwt authentication', {
    field: '[authenticate]',
    statusCode: 401,
    statusText: 'Unauthorized',
    clientId: req.clientId || null,
    token: authorization || null,
    originalUrl: req.originalUrl || null,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
  });

  next();
}
