import { Router } from 'express';
import HandleToken from '../middlewares/handleToken';
import { asyncErrorHandler } from '../middlewares/handleError';
import {
  createKitchen,
  deleteKitchen,
  getKitchen,
  getKitchens,
  updateKitchen,
} from '../controllers/kitchen.controller';
import KitchenHttpValidator from '../validators/kitchen.validator';
import HandleValidationError from '../middlewares/handleValidationError';
import HttpValidator from '../validators';

const kitchenRouter = Router();

kitchenRouter.get('/kitchens', HandleToken, asyncErrorHandler(getKitchens));
kitchenRouter.get(
  '/kitchens/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(getKitchen)
);
kitchenRouter.post(
  '/kitchens',
  KitchenHttpValidator.checkCreateKitchen,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(createKitchen)
);
kitchenRouter.put(
  '/kitchens/:id',
  KitchenHttpValidator.checkUpdateKitchen,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(updateKitchen)
);
kitchenRouter.delete(
  '/kitchens/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(deleteKitchen)
);

export default kitchenRouter;
