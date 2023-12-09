import { prisma } from '@/config';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid';
import bcrypt from 'bcrypt';

async function createUser(name?: string, email?: string, password?: string) {
  const passwordhash = bcrypt.hashSync(password || faker.internet.password(), 10);
  const user = await prisma.users.create({
    data: {
      name: name || faker.person.fullName(),
      email: email || faker.internet.email(),
      password: passwordhash,
    },
  });

  delete user.password;

  return user;
}

async function getUserbyemail(email: string) {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  return user;
}

async function createSession(id: number) {
  createUser();
  const token = uuid();
  const session = await prisma.sessions.create({
    data: {
      token,
      usersId: id,
    },
  });

  return session;
}

export const userFactory = {
  createUser,
  getUserbyemail,
  createSession,
};
