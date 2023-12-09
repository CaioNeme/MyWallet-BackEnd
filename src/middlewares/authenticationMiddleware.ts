import { NextFunction, Request, Response } from 'express';
import { unauthorizedError } from '@/errors';
import { sessionRepository } from '@/repositories/session.repository';

export async function authenticateToken(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.header('Authorization');
  if (!authHeader) throw unauthorizedError('No token provided');

  const token = authHeader.split(' ')[1];
  if (!token) throw unauthorizedError('No token provided');

  const session = await sessionRepository.getSessionByToken(token);
  if (!session) throw unauthorizedError('Invalid token');

  const { usersId } = session;
  if (!usersId) throw unauthorizedError('Invalid token');

  req.userId = usersId;

  next();
}

export type AuthenticatedRequest = Request & RequestAuth;

type RequestAuth = {
  userId: number;
};
