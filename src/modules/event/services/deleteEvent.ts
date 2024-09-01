import { prismaClient } from '../../../app/prisma';

export const deleteEvent = async (eventId: number) => {
  const event = await prismaClient.event.update({
    where: { id: eventId },
    data: { isDeleted: true },
  });

  return event;
};
