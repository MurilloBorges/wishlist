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
  const secret = <jwt.Secret>appSecret;

  const token = jwt.sign(params, secret, {
    expiresIn: expires,
  });

  return token;
}

export function decodeToken(
  token: string,
  ignoreExpiration = false,
): { clientId: string; exp: number } {
  const secret = <jwt.Secret>authConfig.jwt.secret;
  const data = jwt.verify(token, secret, { ignoreExpiration });

  return data as { clientId: string; exp: number };
}

export const jwtIsMissing = (req: Request, res: Response, msg?: string): Response => {
  logger.info('jwt authentication', {
    field: '[authenticate]',
    statusCode: 401,
    statusText: 'Unauthorized',
    clientId: req?.clientId || null,
    tokenResponse: msg || 'Token inválido',
    token: req.headers.authorization || null,
    originalUrl: req.originalUrl || null,
    ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress || null,
  });
  return res.status(401).json({ errors: [{ error: msg || 'Token inválido' }] });
};

export default function ensureAuthenticated(req: Request, res: Response, next: NextFunction): any {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return jwtIsMissing(req, res);
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
      return jwtIsMissing(req, res);
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme) || !token) {
      return jwtIsMissing(req, res);
    }

    const data = decodeToken(token, req.originalUrl === '/authenticate/refresh');

    req.clientId = data.clientId;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return jwtIsMissing(req, res, 'Token expirado');
    }
    return jwtIsMissing(req, res);
  }
}
