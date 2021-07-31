interface IError {
  error: string;
  code: number;
}

class AppError {
  public readonly message: string | undefined;

  public readonly statusCode: number;

  public readonly errors: IError[] | undefined;

  constructor(statusCode = 400, error: IError[] | string) {
    if (error instanceof Array) {
      this.errors = error;
    } else {
      this.message = error as string;
    }
    this.statusCode = statusCode;
  }
}

export default AppError;
