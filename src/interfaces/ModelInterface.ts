export interface Model<T> {
  create({ item }: { item: T }): Promise<T>;
  read(): Promise<T[]>;
  readOne(item: string): Promise<T | null>;
  update(itemA: string, { itemB }: { itemB:T }): Promise<T | null>;
  delete(item: string): Promise<T | null>;
}
