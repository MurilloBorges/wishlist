import { ErrorRequestHandler } from 'express';
import { TokenExpiredError } from 'jsonwebtoken';
import { ValidationError } from 'yup';
import AppError from './AppError';

interface ValidationErrors {
  [key: string]: string[];
}

/**
 * Método responsável interceptar exceções lançadas na classe AppError,
 * e devolver para o cliente
 *
 * @constant
 * @param {ValidationError | TokenExpiredError | AppError} error
 * @param {Request} request
 * @param {Response} response
 * @returns {ErrorRequestHandler} Response
 */
const errorHandler: ErrorRequestHandler = (error, request, response) => {
  if (error instanceof ValidationError) {
    const errors: ValidationErrors = {};

    error.inner.forEach(err => {
      errors[err.path] = err.errors;
    });
    return response.status(400).json({ message: 'Validation fails', errors });
  }

  if (error instanceof TokenExpiredError) {
    return response.status(401).json(error.message);
  }

  if (error instanceof AppError) {
    if (error instanceof Array) {
      return response.status(error.statusCode).json({ errors: error.errors });
    }

    return response.status(error.statusCode).json(error.message);
  }

  return response.status(422).json(error.message);
};

export default errorHandler;
