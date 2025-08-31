import { Router } from 'express';
import { HandleAdminToken, HandleToken } from '../middlewares/handleToken';
import { asyncErrorHandler } from '../middlewares/handleError';
import CategoryHttpValidator from '../validators/category.validator';
import HandleValidationError from '../middlewares/handleValidationError';
import HttpValidator from '../validators';
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from '../controllers/category.controller';

const categoryRouter = Router();

categoryRouter.get(
  '/categories',
  HandleToken,
  asyncErrorHandler(getCategories)
);

categoryRouter.post(
  '/categories',
  CategoryHttpValidator.checkCreateCategory,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(createCategory)
);

categoryRouter.put(
  '/categories/:id',
  CategoryHttpValidator.checkUpdateCategory,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(updateCategory)
);

categoryRouter.delete(
  '/categories/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(deleteCategory)
);

export default categoryRouter;
