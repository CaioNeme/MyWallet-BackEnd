import { Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares/authenticationMiddleware';
import { transactionService } from '@/services/transaction.service';

export async function createTransaction(req: AuthenticatedRequest, res: Response) {
  const { description, value } = req.body;
  const { type } = req.params;
  const { userId } = req;

  await transactionService.createTransaction(userId, value, description, type);

  res.sendStatus(httpStatus.CREATED);
}

export async function getTransactions(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const transactions = await transactionService.getTransactionsByUserId(userId);

  res.status(httpStatus.OK).send(transactions);
}
