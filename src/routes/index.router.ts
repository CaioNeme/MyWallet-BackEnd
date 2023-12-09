import { Router } from 'express';
import healthRouter from './health.router';
import userRouter from './user.router';
import transactionRouter from './transactions.router';

const router = Router();

router.use(healthRouter);
router.use(userRouter);
router.use(transactionRouter);

export default router;
