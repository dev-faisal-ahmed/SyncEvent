import { z } from 'zod';
import { isValidDate } from './common';

export const dateGenerator = (required_error: string, message: string) => {
  return z
    .string({ required_error })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { message })
    .refine((date) => isValidDate(date), { message });
};

export const timeFormate = (message: string) => {
  return z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, message);
};
