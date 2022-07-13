import { Response } from 'express';
import GenericController, { RequestWithBody, ResponseError } from '.';
import { Car } from '../interfaces/CarInterface';
import { Service } from '../interfaces/ServiceInterface';
import CarService from '../services/CarService';

class CarController extends GenericController<Car> {
  private _route: string;

  constructor(
    service: Service<Car> = new CarService(),
    route = '/cars',
  ) {
    super(service);
    this._route = route;
  }

  get route() { return this._route; }

  async create(
    request: RequestWithBody<Car>,
    response: Response<Car | ResponseError>,
  ): Promise<typeof response> {
    try {
      console.log(request.body);
      const newCar = await this.service.create(request.body);
      
      if (newCar) {
        return response.status(201).json(newCar);
      }
      return response.status(400).json({ error: this.errors.notFound });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: this.errors.internal });
    }
  }
}

export default CarController;