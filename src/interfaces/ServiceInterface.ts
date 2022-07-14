import { ZodError } from 'zod';

export interface ServiceError {
  error: ZodError;
}
export interface Service<T> {
  create(entity: T): Promise<T | ServiceError | null >;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, entity: T): Promise<T | ServiceError | null>;
  delete(id: string): Promise<T | null>;
}