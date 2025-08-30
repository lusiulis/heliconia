import { body, param } from 'express-validator';

const SectionHttpValidator = {
  checkCreateSection: [
    body('name')
      .notEmpty()
      .withMessage('The "name" value must not be empty')
      .isString()
      .withMessage('The "name" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "name" value must be a string between 1 and 90 characters'
      ),
    body('color')
      .notEmpty()
      .withMessage('The "color" value must not be empty')
      .isString()
      .withMessage('The "color" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "color" value must be a string between 1 and 90 characters'
      ),
  ],
  checkUpdateSection: [
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
    body('color')
      .optional()
      .isString()
      .withMessage('The "color" value must be a string')
      .isLength({ min: 1, max: 90 })
      .withMessage(
        'The "color" value must be a string between 1 and 90 characters'
      ),
  ],
};

export default SectionHttpValidator;
