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
      const newCar = await this.service.create(request.body);
      if (!newCar) {
        return response.status(400).json({ error: this.errors.notFound });
      }
      if ('error' in newCar) return response.status(400).json(newCar);
      return response.status(201).json(newCar);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: this.errors.internal });
    }
  }

  async read(
    _request: RequestWithBody<Car>,
    response: Response<Car[] | ResponseError>,
  ): Promise<typeof response> {
    try {
      const cars = await this.service.read();
      return response.status(200).json(cars);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: this.errors.internal });
    }
  }

  async readOne(
    request: RequestWithBody<Car>,
    response: Response<Car | ResponseError>,
  ): Promise<typeof response> {
    try {
      const { id } = request.params;
      const car = await this.service.readOne(id);
      if (!car) {
        return response.status(400).json({ error: this.errors.notFound });
      }
      if ('error' in car) return response.status(400).json(car);
      return response.status(200).json(car);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: this.errors.internal });
    }
  }
}

export default CarController;