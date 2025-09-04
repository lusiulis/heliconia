import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { jwt_secret } from '../utils/encryptation';

const HandleToken =
  (role: DeviceRole) => (req: Request, res: Response, next: NextFunction) => {
    try {
      const adminToken = req.cookies.admin_token;
      const token =
        role === 'KITCHEN'
          ? req.cookies[`kitchen_token_${req.params.id}`]
          : role === 'WAITER'
          ? req.cookies.waiter_token
          : req.cookies.checkout_token;

      if (!token && !adminToken)
        return res
          .status(401)
          .json({ success: false, message: 'No token provided', status: 401 });

      if (adminToken && !token) {
        jwt.verify(adminToken, jwt_secret);
        return next();
      }

      const loggedDevice = jwt.verify(token, jwt_secret) as LoggedDevice;
      if (
        role !== loggedDevice.role ||
        (role === 'KITCHEN' && loggedDevice.kitchenId !== req.params.id)
      )
        return res
          .status(403)
          .json({ success: false, message: 'Forbiden content', status: 403 });

      req.loggedDevice = loggedDevice;
      next();
    } catch (e) {
      res.status(403).json({
        success: false,
        status: 403,
        message: 'Invalid access token',
        stack: process.env.NODE_ENV === 'development' ? e : {},
      });
    }
  };

export default HandleToken;
