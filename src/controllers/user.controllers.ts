import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { userService } from '@/services/user.service';

export async function createNewUser(req: Request, res: Response) {
  const { name, email, password } = req.body;

  await userService.createNewUser(name, email, password);

  res.sendStatus(httpStatus.CREATED);
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await userService.login(email, password);

  res.status(httpStatus.OK).send(user.token);
}
