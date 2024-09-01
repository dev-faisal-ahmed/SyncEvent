import { prismaClient } from '../../../app/prisma';
import { AppError, isPropertiesExist } from '../../../helpers';
import { TUpdateEventPayload } from '../validation';

export const updateEvent = async (
  eventId: number,
  payload: TUpdateEventPayload
) => {
  // first of all we need to check if new updated collapse or not?
  const event = await prismaClient.event.findUniqueOrThrow({
    where: { id: eventId, isDeleted: false },
  });

  // checking if date or startTime, endTime, or location changed
  const shouldCheckOverlap = isPropertiesExist(payload, [
    'date',
    'startTime',
    'endTime',
    'location',
  ]);

  if (shouldCheckOverlap) {
    const overlappedEvents = await prismaClient.event.findMany({
      where: {
        id: { not: eventId },
        date: payload.date || event.date,
        location: payload.location || event.location,
        isDeleted: false,
        OR: [
          {
            /* case 1 :
            other event => StartTime : 12:30 
            updating event => StartTime : 12:00 and endTime 01:00
            S------OS------E-----------OE
            which conflicts
            */
            AND: [
              { startTime: { gte: payload.startTime || event.startTime } },
              { startTime: { lte: payload.endTime || event.endTime } },
            ],
          },
          {
            /* case 2 :
            other event => StartTime : 12:30 and endTime : 02:00
            updating event => StartTime : 12:40 and endTime 01:00
            OS----S------E--------OE
            which conflicts
            */
            AND: [
              { startTime: { lte: payload.startTime || event.startTime } },
              { endTime: { gte: payload.endTime || event.endTime } },
            ],
          },
          {
            /* case 3 :
            other event => endTime : 02:00
            updating event => StartTime : 01:30 and endTime 02:10
            S------OE------E
            which conflicts
            */
            AND: [
              { endTime: { gte: payload.startTime || event.startTime } },
              { endTime: { lte: payload.endTime || event.endTime } },
            ],
          },
        ],
      },
    });

    if (overlappedEvents.length)
      throw new AppError('Event overlaps with other events', 400);
  }

  // updating the event
  const response = await prismaClient.event.update({
    where: { id: eventId },
    data: payload,
  });

  // return null;
  return response;
};
