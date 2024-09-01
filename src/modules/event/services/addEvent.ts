import { prismaClient } from '../../../app/prisma';
import { TAddEventPayload } from '../validation';

export const addEvent = async (payload: TAddEventPayload) => {
  const {
    name,
    date,
    startTime,
    endTime,
    description,
    location,
    participants,
  } = payload;
  const { event, participantsData } = await prismaClient.$transaction(
    async (transactionClient) => {
      const event = await transactionClient.event.create({
        data: { name, date, startTime, endTime, description, location },
      });

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
