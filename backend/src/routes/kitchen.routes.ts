import { Router } from 'express';
import { HandleAdminToken, HandleToken } from '../middlewares/handleToken';
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

kitchenRouter.get('/kitchens', HandleToken, HandleAdminToken, asyncErrorHandler(getKitchens));
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
  HandleAdminToken,
  asyncErrorHandler(createKitchen)
);
kitchenRouter.put(
  '/kitchens/:id',
  KitchenHttpValidator.checkUpdateKitchen,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(updateKitchen)
);
kitchenRouter.delete(
  '/kitchens/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(deleteKitchen)
);

export default kitchenRouter;
