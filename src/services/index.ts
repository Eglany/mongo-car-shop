import { Model } from '../interfaces/ModelInterface';
import { Service, ServiceError } from '../interfaces/ServiceInterface';

abstract class GenericService<T> implements Service<T> {
  constructor(protected model: Model<T>) { }

  async create(item: T): Promise<T | ServiceError | null > {
    return this.model.create(item);
  }

  async read(): Promise<T[]> {
    return this.model.read();
  }

  async readOne(id: string): Promise<T | null> {
    return this.model.readOne(id);
  }

  async update(id: string, item: T): Promise<T | null > {
    return this.model.update(id, item);
  }

  async delete(id: string): Promise<T | null> {
    return this.model.delete(id);
  }
}

export default GenericService;