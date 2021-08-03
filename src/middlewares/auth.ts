import { Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import AppError from '../errors/AppError';
import IErrors from '../errors/IErrors';

import authConfig from '../config/auth';
import logger from '../log/logger';

/**
 * Função responsável por gerar o token JWT
 *
 * @export
 * @async
 * @function
 * @param {string} appSecret
 * @param {string} expires
 * @param {Object} params
 * @returns {Promise<string>} Promise<string>
 */
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
    logger.info('[generateToken] error', {
      field: '[generateToken]',
      clientId: params.clientId || null,
      statusCode: 401,
      statusText: 'Unauthorized',
    });
    throw new AppError(500, [IErrors.auth.failedGenerateToken]);
  }
}

/**
 * Função responsável por decodificar o token JWT
 *
 * @export
 * @function
 * @param {string} token
 * @param {boolean} ignoreExpiration
 * @returns {Object} { clientId: string; exp: number }
 */
export function decodeToken(
  token: string,
  ignoreExpiration = false,
): { clientId: string; exp: number } {
  try {
    const secret = <jwt.Secret>authConfig.jwt.secret;
    const data = jwt.verify(token, secret, { ignoreExpiration });

    return data as { clientId: string; exp: number };
  } catch (error) {
    logger.info('[decodeToken] error', {
      field: '[decodeToken]',
      statusCode: 401,
      statusText: 'Unauthorized',
    });
    throw new AppError(401, [IErrors.auth.expiredToken]);
  }
}

/**
 * Função responsável por realizar interceptar e realizar a validação do token JWT
 *
 * @export
 * @default
 * @function
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {any} any
 */
export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): any {
  const { authorization } = req.headers;

  if (!authorization) {
    logger.info('[ensureAuthenticated] jwt is missing', {
      field: '[ensureAuthenticated]',
      clientId: req.clientId || null,
      token: authorization || null,
      originalUrl: req.originalUrl || null,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
    });

    throw new AppError(401, [IErrors.auth.jwt]);
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    logger.info('[ensureAuthenticated] token inválido', {
      field: '[ensureAuthenticated]',
      clientId: req.clientId || null,
      token: authorization || null,
      originalUrl: req.originalUrl || null,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
    });

    throw new AppError(401, [IErrors.auth.tokenInvalid]);
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme) || !token) {
    logger.info('[ensureAuthenticated] token inválido', {
      field: '[ensureAuthenticated]',
      clientId: req.clientId || null,
      token: authorization || null,
      originalUrl: req.originalUrl || null,
      ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
    });

    throw new AppError(401, [IErrors.auth.tokenInvalid]);
  }

  const data = decodeToken(token, req.originalUrl === '/authenticate/refresh');

  req.clientId = data.clientId;

  logger.info('[ensureAuthenticated] jwt authentication', {
    field: '[ensureAuthenticated]',
    clientId: req.clientId || null,
    token: authorization || null,
    originalUrl: req.originalUrl || null,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
  });

  next();
}
