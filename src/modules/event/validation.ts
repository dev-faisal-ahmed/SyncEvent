import { z } from 'zod';
import { dateGenerator, timeFormate } from '../../helpers';

export const addEventValidationSchema = z
  .object({
    name: z.string().min(1, { message: 'Event name is required' }),
    date: dateGenerator('Date is required', 'Invalid date'),
    startTime: timeFormate('Invalid start time formate. Use HH:MM'),
    endTime: timeFormate('Invalid end time formate. Use HH:MM'),
    location: z.string().min(1, { message: 'Location is required' }),
    description: z.string().min(1, { message: 'Description is required' }),
    participants: z.array(z.string().email({ message: 'Invalid Email' })),
  })
  .refine(
    (data) => {
      const [starHour, startMinute] = data.startTime
        .split(':')
        .map((timePart) => Number(timePart));

      const [endHour, endMinute] = data.endTime
        .split(':')
        .map((timePart) => Number(timePart));

      const startDateTime = new Date(0, 0, 0, starHour, startMinute);
      const endDateTime = new Date(0, 0, 0, endHour, endMinute);

      return startDateTime < endDateTime;
    },
    {
      message: 'Start date must be before end time',
      path: ['endTime'],
    }
  );

export const updateEventValidationSchema = z
  .object({
    name: z.string().min(1, { message: 'Event name is required' }).optional(),
    date: dateGenerator('Date is required', 'Invalid date').optional(),
    startTime: timeFormate('Invalid start time formate. Use HH:MM').optional(),
    endTime: timeFormate('Invalid end time formate. Use HH:MM').optional(),
    location: z.string().min(1, { message: 'Location is required' }).optional(),
    description: z
      .string()
      .min(1, { message: 'Description is required' })
      .optional(),
  })
  .refine(
    (data) => {
      // startTime or endTime is not given to change
      if (!data.startTime || !data.endTime) return true;

      const [starHour, startMinute] = data.startTime
        .split(':')
        .map((timePart) => Number(timePart));

      const [endHour, endMinute] = data.endTime
        .split(':')
        .map((timePart) => Number(timePart));

      const startDateTime = new Date(0, 0, 0, starHour, startMinute);
      const endDateTime = new Date(0, 0, 0, endHour, endMinute);

      return startDateTime < endDateTime;
    },
    {
      message: 'Start date must be before end time',
      path: ['endTime'],
    }
  );

export type TAddEventPayload = z.infer<typeof addEventValidationSchema>;
export type TUpdateEventPayload = z.infer<typeof updateEventValidationSchema>;
