import GenericService from '.';
import { Car, CarSchema } from '../interfaces/CarInterface';
import { ServiceError } from '../interfaces/ServiceInterface';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  async create(item: Car): Promise<Car | ServiceError | null > {
    const parsed = CarSchema.safeParse(item);
    if (!parsed.success) return { error: parsed.error };
    const createdCar = await this.model.create(item);
    return createdCar;
  }
}

export default CarService;