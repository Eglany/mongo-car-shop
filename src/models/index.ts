import { Document, Model as MongooseModel } from 'mongoose';
import { Model } from '../interfaces/ModelInterface';
 
abstract class GenericService<T> implements Model<T> {
  constructor(protected mongooseModel: MongooseModel<T & Document>) { }

  async create(item: T): Promise<T> {
    const newItem = await this.mongooseModel.create(item);
    return newItem;
  }

  async read(): Promise<T[]> {
    const allItems = await this.mongooseModel.find();
    return allItems;
  }

  async readOne(item: string): Promise<T | null> {
    const getItem = await this.mongooseModel.findOne({ _id: item });
    return getItem;
  }

  async update(itemA: string, itemB: T): Promise<T | null> {
    const updatedItem = await this.mongooseModel
      .findOneAndUpdate({ _id: itemA }, itemB, { returnOriginal: false });
    return updatedItem;
  }

  async delete(item: string): Promise<T | null> {
    const destroyItem = await this.mongooseModel
      .findOneAndDelete({ _id: item });
    return destroyItem;
  }
}

export default GenericService;