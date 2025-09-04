import { NextFunction, Request, Response } from 'express';

const HandleLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log('Request recived: ', { method: req.method, url: req.url });
  next();
};

export default HandleLogger;
