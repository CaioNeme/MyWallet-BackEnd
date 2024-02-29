import { prisma } from '@/config/database';
import dayjs from 'dayjs';

async function createTransaction(userId: number, value: number, description: string, type: string) {
  const transaction = await prisma.transactions.create({
    data: {
      value,
      description,
      usersId: userId,
      type,
      date: dayjs().format('DD/MM'),
    },
  });
  return transaction;
}

async function getTransactionsByUserId(userId: number) {
  const userWithTransactions = await prisma.users.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      name: true,
      email: true,
      Transactions: {
        select: {
          id: true,
          date: true,
          type: true,
          value: true,
          description: true,
        },
      },
    },
  });

  return userWithTransactions;
}

export const transactionRepository = {
  createTransaction,
  getTransactionsByUserId,
};
