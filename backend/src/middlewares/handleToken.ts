import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_secret } from '../utils/encryptation';

export const HandleToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'No token provided' });
    }

    const loggedDevice = jwt.verify(token, jwt_secret) as LoggedDevice;
    req.loggedDevice = loggedDevice;
    next();
  } catch (e) {
    res.status(403).json({
      success: false,
      status: 403,
      message: 'Forbidden content',
      stack: process.env.NODE_ENV === 'development' ? e : {},
    });
  }
};

export const HandleAdminToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.loggedDevice || req.loggedDevice.role !== 'ADMIN') {
    return res.status(403).json({
      success: false,
      message: 'Forbidden content, need admin role',
      status: 403,
    });
  }
  next();
};
