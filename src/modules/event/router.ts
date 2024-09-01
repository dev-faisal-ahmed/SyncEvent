import * as validation from './validation';
import * as controller from './controller';
import { Router } from 'express';
import { validationHandler } from '../../middlewares';

export const eventsRouter = Router();

eventsRouter.post(
  '/',
  validationHandler(validation.addEventValidationSchema),
  controller.addEvent
);

eventsRouter.get('/', controller.getEvents);
eventsRouter.get('/:eventId', controller.getEVentDetails);

eventsRouter.put(
  '/:eventId',
  validationHandler(validation.updateEventValidationSchema),
  controller.updateEvent
);

eventsRouter.delete('/:eventId', controller.deleteEvent);

eventsRouter.post(
  '/:eventId/participants',
  validationHandler(validation.addParticipantsValidationSchema),
  controller.addParticipants
);

eventsRouter.delete(
  '/:eventId/participants/:participantId',
  controller.deleteParticipant
);
