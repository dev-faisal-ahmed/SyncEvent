import { prismaClient } from '../../../app/prisma';

export const getEventDetails = async (eventId: number) => {
  const event = await prismaClient.event.findUnique({
    where: { id: eventId },
    include: { EventParticipants: { select: { email: true } } },
  });

  return event;
};
