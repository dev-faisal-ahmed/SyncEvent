import { prismaClient } from '../../../app/prisma';

export const deleteParticipant = async (
  participantId: string,
  eventId: number
) => {
  const deletedStatus = await prismaClient.eventParticipants.delete({
    where: { id: participantId, eventId },
  });

  const event = await prismaClient.event.findUnique({
    where: { id: deletedStatus.eventId, isDeleted: false },
    include: { EventParticipants: { select: { email: true } } },
  });

  return event;
};
