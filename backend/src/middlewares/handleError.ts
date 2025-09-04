import { NextFunction, Request, Response } from 'express';

class HttpException extends Error {
  errorCode: number;
  constructor(errorCode: number, public readonly message: string) {
    super(message);
    this.errorCode = errorCode;
  }
}

const asyncErrorHandler =
  (fn: (x: Request, y: Response, z: NextFunction) => void) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

const HandleError = (
  err: Error | HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!err) next();
  console.log(err);
  // @ts-expect-error sisnce error may be a no HttpException we face a type error
  const errStatus = err && err.errorCode ? errorCode : 500;
  const errMsg = err.message
    ? err.message
    : 'There was a problem within the process';
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === 'development' ? err.stack : {},
  });
};

export { HandleError, asyncErrorHandler };
