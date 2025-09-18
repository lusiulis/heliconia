import { Router } from 'express';
import HandleToken from '../middlewares/handleToken';
import { asyncErrorHandler } from '../middlewares/handleError';
import {
  accessDevice,
  getDeletedDevices,
  getDevices,
  refreshToken,
  registerDevice,
  updateDevice,
} from '../controllers/device.controller';
import DeviceHttpValidator from '../validators/device.validator';
import HandleValidationError from '../middlewares/handleValidationError';

const deviceRouter = Router();

deviceRouter.post(
  '/devices/access',
  DeviceHttpValidator.checkAccessDevice,
  HandleValidationError,
  asyncErrorHandler(accessDevice)
);

deviceRouter.post(
  '/devices/refresh',
  DeviceHttpValidator.checkRefreshDeviceToken,
  HandleValidationError,
  asyncErrorHandler(refreshToken)
);

deviceRouter.get(
  '/devices',
  HandleToken('ADMIN'),
  asyncErrorHandler(getDevices)
);

deviceRouter.get(
  '/devices/deleted',
  HandleToken('ADMIN'),
  asyncErrorHandler(getDeletedDevices)
);

deviceRouter.post(
  '/devices',
  DeviceHttpValidator.checkRegisterDevice,
  HandleValidationError,
  HandleToken('ADMIN'),
  asyncErrorHandler(registerDevice)
);

deviceRouter.put(
  '/device/:id',
  DeviceHttpValidator.checkUpdateDevice,
  HandleValidationError,
  HandleToken('ADMIN'),
  asyncErrorHandler(updateDevice)
);

export default deviceRouter;
