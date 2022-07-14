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
  badFormatId = 'Id must have 24 hexadecimal characters',
}

abstract class GenericController<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) { }

  abstract create(
    request: RequestWithBody<T>,
    response: Response<T | ResponseError>,
  ): Promise<typeof response>;

  abstract read(
    request: RequestWithBody<T>,
    response: Response<T[] | ResponseError>,
  ): Promise<typeof response>;

  abstract readOne(
    request: RequestWithBody<T>,
    response: Response<T | ResponseError>,
  ): Promise<typeof response>;

  // abstract update(
  //   request: RequestWithBody<T>,
  //   response: Response<T | ResponseError>,
  // ): Promise<typeof response>;

  // abstract delete(
  //   request: RequestWithBody<T>,
  //   response: Response<T | ResponseError>,
  // ): Promise<typeof response>;
}
export default GenericController;