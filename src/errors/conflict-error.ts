import { ApplicationError } from '@/protocols';

export function ConflictError(message: string): ApplicationError {
  return {
    name: 'ConflictError',
    message: message,
  };
}
