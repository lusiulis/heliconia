import { Router } from 'express';
import HandleToken from '../middlewares/handleToken';
import { asyncErrorHandler } from '../middlewares/handleError';
import ProductHttpValidator from '../validators/product.validator';
import HandleValidationError from '../middlewares/handleValidationError';
import {
  createProduct,
  getDeletedProducts,
  getProducts,
  updateProduct,
} from '../controllers/product.controller';

const productRouter = Router();

productRouter.get('/products', HandleToken, asyncErrorHandler(getProducts));
productRouter.get(
  '/products/deleted',
  HandleToken,
  asyncErrorHandler(getDeletedProducts)
);

productRouter.post(
  '/products',
  ProductHttpValidator.checkCreateProduct,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(createProduct)
);

productRouter.put(
  '/products/:id',
  ProductHttpValidator.checkUpdateProduct,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(updateProduct)
);

export default productRouter;
