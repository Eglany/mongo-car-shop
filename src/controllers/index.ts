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

  abstract create(
    request: RequestWithBody<T>,
    response: Response<T | ResponseError>,
  ): Promise<typeof response>;
}
export default GenericController;