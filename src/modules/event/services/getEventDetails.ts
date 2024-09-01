import { prismaClient } from '../../../app/prisma';
import { AppError } from '../../../helpers';

export const getEventDetails = async (eventId: number) => {
  const event = await prismaClient.event.findUnique({
    where: { id: eventId, isDeleted: false },
    include: { EventParticipants: { select: { email: true } } },
  });

  if (!event) throw new AppError('Event not found', 404);

  return event;
};
