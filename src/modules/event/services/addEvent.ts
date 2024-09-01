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
          AND: [
            {
              OR: [
                // events those end after the new events starts
                { startTime: { lt: endTime } },
                // events those start before the new event's ends
                { endTime: { gt: startTime } },
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
