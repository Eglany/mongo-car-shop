import GenericService from '.';
import { Car, CarSchema } from '../interfaces/CarInterface';
import { ServiceError } from '../interfaces/ServiceInterface';
import CarModel from '../models/CarModel';

class CarService extends GenericService<Car> {
  constructor(model = new CarModel()) {
    super(model);
  }

  async create(item: Car): Promise<Car | ServiceError | null > {
    console.log('entrando na service ...');
    
    const parsed = CarSchema.safeParse(item);
    
    if (!parsed.success) return { error: parsed.error }; 
    return this.model.create(item);
  }
}

export default CarService;