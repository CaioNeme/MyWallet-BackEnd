import { prisma } from '../src/config/database';

export async function dbClean() {
  await prisma.sessions.deleteMany({});
  await prisma.transactions.deleteMany({});
  await prisma.users.deleteMany({});
}
