export interface Model<T> {
  create({ item }: { item: T }): Promise<T>;
  read(item: T[]): Promise<T>;
  readOne(item: string): Promise<T> | null;
  update(itemA: string, { itemB }: { itemB:T }): Promise<T> | null;
  delete(itemA: string, { itemB }: { itemB:T }): Promise<T> | null;
}
