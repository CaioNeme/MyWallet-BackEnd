import { v4 as uuid } from 'uuid';
import { prisma } from '@/config/database';

async function createSession(userId: number) {
  const token = uuid();
  const session = await prisma.sessions.create({
    data: {
      token,
      usersId: userId,
    },
  });
  return session;
}

async function getSessionByToken(token: string) {
  const session = await prisma.sessions.findUnique({
    where: {
      token,
    },
  });
  return session;
}

export const sessionRepository = {
  createSession,
  getSessionByToken,
};
