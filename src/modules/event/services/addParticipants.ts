import { AppError } from '../../../helpers';
import { prismaClient } from '../../../app/prisma';
import { TAddParticipantsPayload } from '../validation';

export const addParticipants = async (
  eventId: number,
  payload: TAddParticipantsPayload
) => {
  await prismaClient.event.findUniqueOrThrow({
    where: { id: eventId, isDeleted: false },
  });

  if (!payload.participants.length)
    throw new AppError('Please insert some participants', 400);

  const newParticipants = await prismaClient.eventParticipants.createMany({
    data: payload.participants.map((participant) => ({
      email: participant,
      eventId,
    })),
    skipDuplicates: true,
  });

  // if no participant's were added
  if (!newParticipants.count)
    throw new AppError('Failed add participants', 400);

  // to show event info after update
  const event = await prismaClient.event.findUnique({
    where: { id: eventId },
    include: { EventParticipants: { select: { email: true } } },
  });

  return event;
};
