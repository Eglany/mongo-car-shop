import { Document, isValidObjectId, Model as MongooseModel } from 'mongoose';
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

  async readOne(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const getItem = await this.mongooseModel.findOne({ _id: id });
    return getItem;
  }

  async update(id: string, itemB: T): Promise<T | null> {
    if (!isValidObjectId(id)) return null;

    const updatedItem = await this.mongooseModel
      .findOneAndUpdate({ _id: id }, itemB, { returnOriginal: false });
    return updatedItem;
  }

  async delete(id: string): Promise<T | null> {
    if (!isValidObjectId(id)) return null;
    const destroyItem = await this.mongooseModel
      .findOneAndDelete({ _id: id });
    return destroyItem;
  }
}

export default GenericService;