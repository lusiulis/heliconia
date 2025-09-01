import { Router } from 'express';
import AuthHttpValidator from '../validators/auth.validator';
import HandleValidationError from '../middlewares/handleValidationError';
import { asyncErrorHandler } from '../middlewares/handleError';
import {
  login,
  refreshToken,
  updateUser,
} from '../controllers/auth.controller';
import HandleToken from '../middlewares/handleToken';

const authRouter = Router();

authRouter.post(
  '/auth/login',
  AuthHttpValidator.checkLogin,
  HandleValidationError,
  asyncErrorHandler(login)
);

authRouter.post(
  '/auth/refresh',
  asyncErrorHandler(refreshToken)
);

authRouter.put(
  '/auth/:id',
  AuthHttpValidator.checkUpdateUser,
  HandleValidationError,
  HandleToken('ADMIN'),
  asyncErrorHandler(updateUser)
);

export default authRouter;
