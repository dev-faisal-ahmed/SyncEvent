import { prismaClient } from '../../../app/prisma';
import { IMeta } from '../../../global/interface';

export const getEvents = async (query: Record<string, any>) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 20;

  const events = await prismaClient.event.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const total = await prismaClient.event.count();

  const meta: IMeta = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };

  return { events, meta };
};
