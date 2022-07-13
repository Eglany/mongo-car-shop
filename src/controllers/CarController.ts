import GenericController from '.';
import { Car } from '../interfaces/CarInterface';
import CarService from '../services/CarService';

class CarController extends GenericController<Car> {
  private _route: string;

  constructor(
    service = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }
}

export default CarController;