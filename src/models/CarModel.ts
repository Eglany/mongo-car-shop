import { Document, Model, Schema } from 'mongoose';
import { Car } from '../interfaces/CarInterface';
import MongoModel from './MongoModel';
// import {Model} from '../interfaces/ModelInterface'
 
interface CarDocument extends Car, Document { }

const carDocument = new Schema<CarDocument>({
  model: String,
  year: Number,
  color: String,
  status: Boolean,
  buyValue: Number,
  doorsQty: Number,
  seatsQty: Number,
}, {
  versionKey: false,
});

class CarModel extends MongoModel<Car> {
  constructor(model = new Model('Car', carDocument)) {
    super(model);
  }
}

export default CarModel;