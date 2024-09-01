import { Router } from 'express';
import { eventRouter, eventsRouter } from '../modules/event/router';

export const appRouter = Router();

appRouter.use('/event', eventRouter);
appRouter.use('/events', eventsRouter);
