import { body, param } from 'express-validator';

const DeviceHttpValidator = {
  checkAccessDevice: [
    body('secret')
      .notEmpty()
      .withMessage('The "secret" value must not be empty')
      .isString()
      .withMessage('The "secret" value must be a string')
      .isLength({ min: 1, max: 200 })
      .withMessage(
        'The "secret" value must be a string between 1 and 200 characters'
      ),
    body('id')
      .notEmpty()
      .withMessage('The "id" value must not be empty')
      .isUUID(4)
      .withMessage('The "id" param must be in UUID v4 format'),
  ],
  checkRefreshDeviceToken: [
    body('role')
      .notEmpty()
      .withMessage('The "role" value must not be empty')
      .isIn(['KITCHEN', 'CHECKOUT', 'WAITER'])
      .withMessage('The "role" value must be KITCHEN, CHECKOUT or WAITER'),
    body('kitchenId')
      .optional()
      .isUUID(4)
      .withMessage('The "kitchenId" param must be in UUID v4 format'),
  ],
  checkRegisterDevice: [
    body('secret')
      .notEmpty()
      .withMessage('The "secret" value must not be empty')
      .isString()
      .withMessage('The "secret" value must be a string')
      .isLength({ min: 1, max: 200 })
      .withMessage(
        'The "secret" value must be a string between 1 and 200 characters'
      ),
    body('name')
      .notEmpty()
      .withMessage('The "name" value must not be empty')
      .isString()
      .withMessage('The "name" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "name" value must be a string between 1 and 90 characters'
      ),
    body('role')
      .notEmpty()
      .withMessage('The "role" value must not be empty')
      .isIn(['KITCHEN', 'CHECKOUT', 'WAITER'])
      .withMessage('The "role" value must be KITCHEN, CHECKOUT or WAITER'),
    body('kitchenId')
      .optional()
      .isUUID(4)
      .withMessage('The "kitchenId" param must be in UUID v4 format'),
  ],
  checkUpdateDevice: [
    param('id')
      .isUUID(4)
      .withMessage('The "id" param must be in UUID v4 format'),
    body('secret')
      .optional()
      .isString()
      .withMessage('The "secret" value must be a string')
      .isLength({ min: 1, max: 200 })
      .withMessage(
        'The "secret" value must be a string between 1 and 200 characters'
      ),
    body('name')
      .optional()
      .isString()
      .withMessage('The "name" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "name" value must be a string between 1 and 90 characters'
      ),
    body('role')
      .optional()
      .isIn(['ADMIN', 'KITCHEN', 'CHECKOUT', 'WAITER'])
      .withMessage(
        'The "role" value must be ADMIN, KITCHEN, CHECKOUT or WAITER'
      ),
    body('deleted')
      .optional()
      .isBoolean()
      .withMessage('The "deleted" value must be a boolean'),
    body('kitchenId')
      .optional()
      .isUUID(4)
      .withMessage('The "kitchenId" param must be in UUID v4 format'),
  ],
};

export default DeviceHttpValidator;
