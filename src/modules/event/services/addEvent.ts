import { prismaClient } from '../../../app/prisma';
import { AppError } from '../../../helpers';
import { TAddEventPayload } from '../validation';

export const addEvent = async ({
  name,
  date,
  startTime,
  endTime,
  description,
  location,
  participants,
}: TAddEventPayload) => {
  const { event, participantsData } = await prismaClient.$transaction(
    async (transactionClient) => {
      // finding overlapping events
      const overlapsEvents = await transactionClient.event.findMany({
        where: {
          date,
          location,
          OR: [
            {
              /* case 1 :
            other event => StartTime : 12:30 
            new event => StartTime : 12:00 and endTime 01:00
            S------OS------E-----------OE
            which conflicts
            */
              AND: [
                { startTime: { gte: startTime } },
                { startTime: { lte: endTime } },
              ],
            },
            {
              /* case 2 :
            other event => StartTime : 12:30 and endTime : 02:00
            new event => StartTime : 12:40 and endTime 01:00
            OS----S------E--------OE
            which conflicts
            */
              AND: [
                { startTime: { lte: startTime || startTime } },
                { endTime: { gte: endTime || endTime } },
              ],
            },
            {
              /* case 3 :
            other event => endTime : 02:00
            new event => StartTime : 01:30 and endTime 02:10
            S------OE------E
            which conflicts
            */
              AND: [
                { endTime: { gte: startTime || startTime } },
                { endTime: { lte: endTime || endTime } },
              ],
            },
          ],
        },
      });

      if (overlapsEvents.length)
        throw new AppError('Event overlaps with existing events', 400);

      // creating new event
      const event = await transactionClient.event.create({
        data: { name, date, startTime, endTime, description, location },
      });

      // adding participants
      const participantsData =
        await transactionClient.eventParticipants.createMany({
          data: participants.map((participant) => ({
            eventId: event.id,
            email: participant,
          })),
        });

      return { event, participantsData };
    }
  );

  return { event, participantsData };
};
