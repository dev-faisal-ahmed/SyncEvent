import * as validation from './validation';
import * as controller from './controller';
import { Router } from 'express';
import { validationHandler } from '../../middlewares';

export const eventRouter = Router();
export const eventsRouter = Router();

//event
eventRouter.post(
  '/',
  validationHandler(validation.addEvent),
  controller.addEvent
);

// events
eventsRouter.get('/', controller.getEvents);
