import { NextFunction, Request, Response } from 'express';

const HandleToken = (req: Request, res: Response, next: NextFunction) => {
  next();
  /*try {
    const token = req.cookies.token;
    const user = jwt.verify(token, jwt_secret) as SanitaizedUser;
    req.user = user;
    next();
  } catch (e) {
    res.status(403).json({
      success: false,
      status: 403,
      message: 'Forbidden content',
      stack: process.env.NODE_ENV === 'development' ? e : {},
    });
  }*/
};

export default HandleToken;
