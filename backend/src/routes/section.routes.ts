import { Router } from 'express';
import HandleToken from '../middlewares/handleToken';
import { asyncErrorHandler } from '../middlewares/handleError';
import {
  createSection,
  deleteSection,
  getSection,
  getSections,
  updateSection,
} from '../controllers/section.controller';
import SectionHttpValidator from '../validators/section.validator';
import HandleValidationError from '../middlewares/handleValidationError';
import HttpValidator from '../validators';

const sectionRouter = Router();

sectionRouter.get(
  '/sections',
  HandleToken('WAITER'),
  asyncErrorHandler(getSections)
);

sectionRouter.get(
  '/sections/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken('WAITER'),
  asyncErrorHandler(getSection)
);

sectionRouter.post(
  '/sections',
  SectionHttpValidator.checkCreateSection,
  HandleValidationError,
  HandleToken('ADMIN'),
  asyncErrorHandler(createSection)
);

sectionRouter.put(
  '/sections/:id',
  SectionHttpValidator.checkUpdateSection,
  HandleValidationError,
  HandleToken('ADMIN'),
  asyncErrorHandler(updateSection)
);

sectionRouter.delete(
  '/sections/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken('ADMIN'),
  asyncErrorHandler(deleteSection)
);

export default sectionRouter;
