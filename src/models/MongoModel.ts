import { Model as MongooseModel } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';
 
abstract class MongoModel<T> implements Model<T> {
  private _mongooseModel: MongooseModel<T>;

  constructor(mongooseModel: MongooseModel<T>) {
    this._mongooseModel = mongooseModel;
  }

  async create({ item }: { item: T; }): Promise<T> {
    const newItem = await this._mongooseModel.create(item);
    return newItem;
  }

  // read(item: T[]): Promise<T> {
  //   throw new Error('Method not implemented.');
  // }

  // readOne(item: string): Promise<T> | null {
  //   throw new Error('Method not implemented.');
  // }

  async update(itemA: string, { itemB }: { itemB: T }): Promise<T | null> {
    const updatedItem = this._mongooseModel
      .findOneAndUpdate({ _id: itemA }, itemB, { returnOriginal: false });
    return updatedItem;
  }

  // delete(itemA: string, { itemB }: { itemB: T; }): Promise<T | null> {
  //   throw new Error('Method not implemented.');
  // }
}

export default MongoModel;