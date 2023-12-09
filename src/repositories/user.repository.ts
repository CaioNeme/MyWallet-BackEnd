import { prisma } from '@/config/database';

async function getUserByEmail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  return user;
}

async function createNewUser(name: string, email: string, password: string) {
  const user = await prisma.users.create({
    data: {
      name,
      email,
      password,
    },
  });
  delete user.password;

  return user;
}

export const userRepository = {
  getUserByEmail,
  createNewUser,
};
