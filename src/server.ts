import App from './app';
import CarController from './controllers/CarController';
import { Car } from './interfaces/CarInterface';
import CustomRouter from './routes/carRouter';

const server = new App();

const carController = new CarController();
const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

export default server;
