import { z } from 'zod';
import { dateGenerator, timeFormate } from '../../helpers';

export const addEvent = z.object({
  name: z.string().min(1, { message: 'Event name is required' }),
  date: dateGenerator('Date is required', 'Invalid date'),
  startTime: timeFormate('Invalid start time formate. Use HH:MM'),
  endTime: timeFormate('Invalid end time formate. Use HH:MM'),
  location: z.string().min(1, { message: 'Location is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  participants: z.array(z.string().email({ message: 'Invalid Email' })),
});

export type TAddEventPayload = z.infer<typeof addEvent>;
