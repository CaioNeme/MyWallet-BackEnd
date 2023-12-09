import { Router } from 'express';
import { createTransaction, getTransactions } from '@/controllers/trasaction.controllers';
import { authenticateToken } from '@/middlewares/authenticationMiddleware';
import { validateBody } from '@/middlewares/validationSchema';
import { transactionSchema } from '@/schema/transactions.schemas';

const transactionRouter = Router();
transactionRouter.all('*', authenticateToken);
transactionRouter.post('/nova-transacao/:type', validateBody(transactionSchema), createTransaction);
transactionRouter.get('/home', getTransactions);

export default transactionRouter;
