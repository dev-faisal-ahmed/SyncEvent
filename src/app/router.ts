import { Router } from 'express';
import { eventRouter } from '../modules/event/router';

export const appRouter = Router();

appRouter.use('/event', eventRouter);
