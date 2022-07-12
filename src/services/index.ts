import { Model } from '../interfaces/ModelInterface';
import { ServiceError } from '../interfaces/ServiceInterface';
abstract class GenericService<T> {
  constructor(protected model: Model<T>) { }

  async create(item: T): Promise<T | null | ServiceError> {
    return this.model.create(item);
  }

  async read(): Promise<T[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<T | null | ServiceError> {
    return this.model.readOne(id);
  }

  async update(id: string, item: T): : Promise<T | null > {
    return this.model.update(id, item);
  }
}

export default GenericService;