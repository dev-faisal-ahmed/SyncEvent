import { Router } from 'express';
import { eventsRouter } from '../modules/event/router';

export const appRouter = Router();

appRouter.use('/events', eventsRouter);
