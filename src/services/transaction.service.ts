import { invalidDataError } from '@/errors';
import { transactionRepository } from '@/repositories/trasactions.repository';

async function createTransaction(userId: number, value: number, description: string, type: string) {
  if (!userId || !value || !description || !type) {
    throw invalidDataError('userId, value, description and type are required');
  }

  if (type !== 'entrada' && type !== 'saida') {
    throw invalidDataError('Type must be credit or debit');
  }

  if (value <= 0) {
    throw invalidDataError('Value must be greater than 0');
  }

  if (type === 'entrada') {
    const transaction = await transactionRepository.createTransaction(userId, value, description, 'deposit');
    return transaction;
  } else if (type === 'saida') {
    const transaction = await transactionRepository.createTransaction(userId, value, description, 'withdraw');
    return transaction;
  }
}

async function getTransactionsByUserId(userId: number) {
  const transactions = await transactionRepository.getTransactionsByUserId(userId);
  return transactions;
}

export const transactionService = {
  createTransaction,
  getTransactionsByUserId,
};
