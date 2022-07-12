export interface Model<T> {
  create(id: T): Promise<T>;
  read(): Promise<T[]>;
  readOne(id: string): Promise<T | null>;
  update(id: string, itemB: T): Promise<T | null>;
  delete(id: string): Promise<T | null>;
}
