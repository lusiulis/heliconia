import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

const HandleValidationError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res.status(400).json({ requestError: error.array()[0] });
  next();
};

export default HandleValidationError;
