import { Router } from 'express';
import HandleToken from '../middlewares/handleToken';
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
  asyncErrorHandler(createCategory)
);

categoryRouter.put(
  '/categories/:id',
  CategoryHttpValidator.checkUpdateCategory,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(updateCategory)
);

categoryRouter.delete(
  '/categories/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(deleteCategory)
);

export default categoryRouter;
