import { body, param } from 'express-validator';

const AuthHttpValidator = {
  checkLogin: [
    body('username')
      .notEmpty()
      .withMessage('The "username" value must not be empty')
      .isString()
      .withMessage('The "username" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "username" value must be a string between 1 and 90 characters'
      ),
    body('password')
      .notEmpty()
      .withMessage('The "password" value must not be empty')
      .isString()
      .withMessage('The "password" value must be a string')
      .isLength({ min: 1, max: 20 })
      .withMessage(
        'The "password" value must be a string between 1 and 20 characters'
      ),
  ],
  checkUpdateUser: [
    param('id')
      .isUUID(4)
      .withMessage('The "id" param must be in UUID v4 format'),
    body('username')
      .optional()
      .isString()
      .withMessage('The "username" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "username" value must be a string between 1 and 90 characters'
      ),
    body('password')
      .optional()
      .isString()
      .withMessage('The "password" value must be a string')
      .isLength({ min: 1, max: 20 })
      .withMessage(
        'The "password" value must be a string between 1 and 20 characters'
      ),
  ],
};

export default AuthHttpValidator;
