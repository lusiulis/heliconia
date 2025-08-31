import { Router } from 'express';
import { HandleAdminToken, HandleToken } from '../middlewares/handleToken';
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

sectionRouter.get('/sections', HandleToken, asyncErrorHandler(getSections));

sectionRouter.get(
  '/sections/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken,
  asyncErrorHandler(getSection)
);

sectionRouter.post(
  '/sections',
  SectionHttpValidator.checkCreateSection,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(createSection)
);

sectionRouter.put(
  '/sections/:id',
  SectionHttpValidator.checkUpdateSection,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(updateSection)
);

sectionRouter.delete(
  '/sections/:id',
  HttpValidator.checkIdParam,
  HandleValidationError,
  HandleToken,
  HandleAdminToken,
  asyncErrorHandler(deleteSection)
);

export default sectionRouter;
