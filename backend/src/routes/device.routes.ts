import { Router } from 'express';
import { HandleAdminToken, HandleToken } from '../middlewares/handleToken';
import { asyncErrorHandler } from '../middlewares/handleError';
import {
  accessDevice,
  getDeletedDevices,
  getDevices,
  registerDevice,
  updateDevice,
} from '../controllers/device.controller';
import DeviceHttpValidator from '../validators/device.validator';
import HandleValidationError from '../middlewares/handleValidationError';
import HttpValidator from '../validators';

const deviceRouter = Router();

deviceRouter.post(
  '/device/access',
  DeviceHttpValidator.checkAccessDevice,
  HandleValidationError,
  asyncErrorHandler(accessDevice)
);

deviceRouter.get(
  '/devices',
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(getDevices)
);

deviceRouter.get(
  '/devices/deleted',
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(getDeletedDevices)
);

deviceRouter.post(
  '/devices',
  DeviceHttpValidator.checkRegisterDevice,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(registerDevice)
);

deviceRouter.put(
  '/device/:id',
  DeviceHttpValidator.checkUpdateDevice,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(updateDevice)
);

export default deviceRouter;
