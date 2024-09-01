import express from 'express';
import cors from 'cors';
import { appRouter } from './router';
import { globalErrorHandler } from '../middlewares';

export const app = express();

// parser
app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1', appRouter);

app.get('/', (_req, res) => {
  res.status(200).json({ ok: true, message: 'Welcome to SyncEvent' });
});

app.all('*', (_req, res) => {
  res.status(404).json({ ok: false, message: 'This path does not exist' });
});

app.use(globalErrorHandler);
