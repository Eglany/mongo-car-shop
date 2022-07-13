import { Router } from 'express';
import GenericController from '../controllers';

class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: GenericController<T>,
    route: string = controller.route,
  ) {
    // this.router.get(route, controller.read);
    // this.router.get(`${route}/:id`, controller.readOne);
    this.router.post(route, controller.create);
  }
}

export default CustomRouter;