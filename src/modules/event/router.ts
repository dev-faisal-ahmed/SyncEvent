import * as validation from './validation';
import * as controller from './controller';
import { Router } from 'express';
import { validationHandler } from '../../middlewares';

export const eventRouter = Router();

eventRouter.post(
  '/',
  validationHandler(validation.addEvent),
  controller.addEvent
);
