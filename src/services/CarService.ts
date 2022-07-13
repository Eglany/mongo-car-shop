import GenericService from '.';
import { Car } from '../interfaces/CarInterface';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }
}

export default CarService;