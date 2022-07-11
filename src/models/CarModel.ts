import { Model as MongooseModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import { Model } from '../interfaces/ModelInterface';
 
class CarModel implements Model<Car> {
  private _carMongooseModel: MongooseModel<Car>;

  constructor(carMongooseModel: MongooseModel<Car>) {
    this._carMongooseModel = carMongooseModel;
  }

  // async create({ item }: { item: T; }): Promise<T> {
  //   throw new Error('Method not implemented.');
  // }

  // async read(item: T[]): Promise<T> {
  //   throw new Error('Method not implemented.');
  // }

  // async readOne(item: string): Promise<T> | null {
  //   throw new Error('Method not implemented.');
  // }

  // async update(itemA: string, { itemB }: { itemB: T; }): Promise<T> | null {
  //   throw new Error('Method not implemented.');
  // }

  // async delete(itemA: string, { itemB }: { itemB: T; }): Promise<T> | null {
  //   throw new Error('Method not implemented.');
  // }
}

export default CarModel;