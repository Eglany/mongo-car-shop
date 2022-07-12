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

  async read(): Promise<T[]> {
    const allItems = await this._mongooseModel.find();
    return allItems;
  }

  async readOne(item: string): Promise<T> | null {
    const getItem = await this._mongooseModel.findOne({ _id: item });
    return allItems;
  }

  async update(itemA: string, { itemB }: { itemB: T }): Promise<T | null> {
    const updatedItem = this._mongooseModel
      .findOneAndUpdate({ _id: itemA }, itemB, { returnOriginal: false });
    return updatedItem;
  }

  // async delete(itemA: string, { itemB }: { itemB: T; }): Promise<T | null> {
  //   throw new Error('Method not implemented.');
  // }
}

export default MongoModel;