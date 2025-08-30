import { body, param } from 'express-validator';

const ProductHttpValidator = {
  checkCreateProduct: [
    body('name')
      .notEmpty()
      .withMessage('The "name" value must not be empty')
      .isString()
      .withMessage('The "name" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "name" value must be a string between 1 and 90 characters'
      ),
    body('description')
      .notEmpty()
      .withMessage('The "description" value must not be empty')
      .isString()
      .withMessage('The "description" value must be a string')
      .isLength({ min: 1, max: 500 })
      .withMessage(
        'The "description" value must be a string between 1 and 500 characters'
      ),
    body('price')
      .notEmpty()
      .withMessage('The "price" value must not be empty')
      .isInt()
      .withMessage('The "price" value must be an integer'),
    body('img')
      .notEmpty()
      .withMessage('The "img" value must not be empty')
      .isString()
      .withMessage('The "img" value must be a string')
      .isLength({ min: 1, max: 200 })
      .withMessage(
        'The "img" value must be a string between 1 and 500 characters'
      ),
    body('hasOptions')
      .notEmpty()
      .withMessage('The "hasOptions" value must not be empty')
      .isBoolean()
      .withMessage('The "hasOptions" value must be a boolean'),
    body('kitchenId')
      .notEmpty()
      .withMessage('The "kitchenId" value must not be empty')
      .isUUID(4)
      .withMessage('The "kitchenId" value must be in UUID v4 format'),
  ],
  checkUpdateProduct: [
    param('id')
      .isUUID(4)
      .withMessage('The "id" param must be in UUID v4 format'),
    body('name')
      .optional()
      .isString()
      .withMessage('The "name" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "name" value must be a string between 1 and 90 characters'
      ),
    body('description')
      .optional()
      .isString()
      .withMessage('The "description" value must be a string')
      .isLength({ min: 1, max: 500 })
      .withMessage(
        'The "description" value must be a string between 1 and 500 characters'
      ),
    body('price')
      .optional()
      .isInt()
      .withMessage('The "price" value must be an integer'),
    body('img')
      .optional()
      .isString()
      .withMessage('The "img" value must be a string')
      .isLength({ min: 1, max: 200 })
      .withMessage(
        'The "img" value must be a string between 1 and 500 characters'
      ),
    body('hasOptions')
      .optional()
      .isBoolean()
      .withMessage('The "hasOptions" value must be a boolean'),
    body('kitchenId')
      .optional()
      .isUUID(4)
      .withMessage('The "kitchenId" value must be in UUID v4 format'),
    body('deleted')
      .optional()
      .isBoolean()
      .withMessage('The "hasOptions" value must be a boolean'),
  ],
};

export default ProductHttpValidator;
