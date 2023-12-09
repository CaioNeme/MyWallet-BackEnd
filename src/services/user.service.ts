import bcrypt from 'bcrypt';
import { ConflictError, invalidDataError, unauthorizedError } from '@/errors';
import { sessionRepository } from '@/repositories/session.repository';
import { userRepository } from '@/repositories/user.repository';

async function createNewUser(name: string, email: string, password: string) {
  if (!name || !email || !password) {
    throw invalidDataError('Name, email and password are required');
  }

  const validetedEmail = await userRepository.getUserByEmail(email);

  if (validetedEmail) {
    throw ConflictError('Email already exists');
  }

  const passwordHash = bcrypt.hashSync(password, 10);
  const user = await userRepository.createNewUser(name, email, passwordHash);
  return user;
}

async function login(email: string, password: string) {
  if (!email || !password) {
    throw invalidDataError('Email and password are required');
  }

  const user = await userRepository.getUserByEmail(email);
  if (!user) {
    throw unauthorizedError('Invalid email or password');
  }

  const passwordMatch = bcrypt.compareSync(password, user.password);
  if (!passwordMatch) {
    throw unauthorizedError('Invalid email or password');
  }

  const session = await sessionRepository.createSession(user.id);

  return session;
}

export const userService = {
  createNewUser,
  login,
};
