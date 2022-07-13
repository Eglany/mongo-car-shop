// src/controllers/index.ts

import { Request, Response } from 'express';
import { Service } from '../interfaces/ServiceInterface';

export type ResponseError = {
  error: unknown;
};

export interface RequestWithBody<T> extends Request {
  body: T;
}

enum ControllerErrors {
  internal = 'Internal Server Error',
  notFound = 'Object not found',
  requiredId = 'Id is required',
  badRequest = 'Bad request',
}

abstract class GenericController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  async create(
    request: RequestWithBody<T>,
    response: Response<T | ResponseError>,
  ): Promise<typeof response> {
    try {
      const newCar = await this.service.create(request.body);
      if (newCar) {
        return response.status(201).json(newCar);
      }
      return response.status(400).json({ error: this.errors.notFound });
    } catch (error) {
      console.log(error)
      return response.status(500).json({error: this.errors.internal})
    }

  }

  async read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const objs = await this.service.read();
      return res.json(objs);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  };

  abstract readOne(
    req: Request<{ id: string; }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;
}
export default GenericController;