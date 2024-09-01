import { prismaClient } from '../../../app/prisma';
import { TUpdateEventPayload } from '../validation';

export const updateEvent = async (
  eventId: number,
  payload: TUpdateEventPayload
) => {
  const result = await prismaClient.event.update({
    where: { id: eventId },
    data: payload,
  });

  return result;
};
