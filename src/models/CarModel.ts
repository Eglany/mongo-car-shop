import { Model as MongooseModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
 
class CarModel {
  constructor(private carMongooseModel: MongooseModel<Car>) {}
}

export default CarModel;