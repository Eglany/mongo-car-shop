import { Response } from 'express';
import { isValidObjectId } from 'mongoose';
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
      if (!isValidObjectId(id)) {
        return response.status(400).json({ error: this.errors.badFormatId });
      }
      const car = await this.service.readOne(id);
      return car
        ? response.status(200).json(car)
        : response.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: this.errors.internal });
    }
  }

  async update(
    request: RequestWithBody<Car>,
    response: Response<Car | ResponseError>,
  ): Promise<typeof response> {
    try {
      const { id } = request.params;

      if (!isValidObjectId(id)) {
        return response.status(400).json({ error: this.errors.badFormatId });
      }
      const carUpdated = await this.service.update(id, request.body);
      if (!carUpdated) {
        return response.status(404).json({ error: this.errors.notFound });
      }
      if ('error' in carUpdated) return response.status(400).json(carUpdated);
      return response.status(200).json(carUpdated);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: this.errors.internal });
    }
  }

  async delete(
    request: RequestWithBody<Car>,
    response: Response<Car | ResponseError>,
  ): Promise<typeof response> {
    try {
      const { id } = request.params;

      if (!isValidObjectId(id)) {
        return response.status(400).json({ error: this.errors.badFormatId });
      }
      const carDeleted = await this.service.update(id, request.body);
      return carDeleted
        ? response.status(204).json()
        : response.status(404).json({ error: this.errors.notFound });
    } catch (error) {
      console.log(error);
      return response.status(500).json({ error: this.errors.internal });
    }
  }
}

export default CarController;