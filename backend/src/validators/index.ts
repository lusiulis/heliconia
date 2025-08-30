import { param } from 'express-validator';

const HttpValidator = {
  checkIdParam: [
    param('id')
      .isUUID(4)
      .withMessage('The "id" param must be in UUID v4 format'),
  ],
};

export default HttpValidator;
