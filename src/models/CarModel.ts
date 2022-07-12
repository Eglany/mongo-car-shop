import { Document, Model, Schema } from 'mongoose';
import GenericService from '.';
import { Car } from '../interfaces/CarInterface';
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

class CarModel extends GenericService<Car> {
  constructor(model = new Model('Car', carDocument)) {
    super(model);
  }
}

export default CarModel;