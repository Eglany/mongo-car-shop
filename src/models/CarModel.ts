import { Model as MongooseModel } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import { Model } from '../interfaces/ModelInterface';
 
class CarModel implements Model<Car> {
  constructor(private carMongooseModel: MongooseModel<Car>) {}
}

export default CarModel;