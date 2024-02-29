import { AuthenticatedRequest } from '@/middlewares/authenticationMiddleware';
import { transactionService } from '@/services/transaction.service';
import { Response } from 'express';
import httpStatus from 'http-status';

export async function createTransaction(req: AuthenticatedRequest, res: Response) {
  const { description, value } = req.body;
  const { type } = req.params;
  const { userId } = req;
  let valuenum = Number(value);

  await transactionService.createTransaction(userId, valuenum, description, type);

  res.sendStatus(httpStatus.CREATED);
}

export async function getTransactions(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const transactions = await transactionService.getTransactionsByUserId(userId);

  res.status(httpStatus.OK).send(transactions);
}
