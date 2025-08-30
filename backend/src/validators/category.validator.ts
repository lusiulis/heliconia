import { body, param } from 'express-validator';

const CategoryHttpValidator = {
  checkCreateCategory: [
    body('name')
      .notEmpty()
      .withMessage('The "name" value must not be empty')
      .isString()
      .withMessage('The "name" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "name" value must be a string between 1 and 90 characters'
      ),
    body('sectionId')
      .isUUID(4)
      .withMessage('The "sectionId" value must be in UUID v4 format'),
  ],
  checkUpdateCategory: [
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
    body('sectionId')
      .optional()
      .isUUID(4)
      .withMessage('The "sectionId" value must be in UUID v4 format'),
  ],
};

export default CategoryHttpValidator;
