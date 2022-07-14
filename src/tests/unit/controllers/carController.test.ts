import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import Sinon from "sinon";
import CarController from "../../../controllers/CarController";
import server from "../../../server";
import CarService from "../../../services/CarService";



chai.use(chaiHttp);

const carController = new CarController();

const carMock = {
	model: 'cruze',
	year: 2015,
	color: 'gray',
	status: false,
	buyValue: 80000,
	doorsQty: 4,
	seatsQty: 5
}


describe("Test CarController", () => {
  let serviceStub: Sinon.SinonStub;

  describe("method create", () => {
    before(() => {
      serviceStub = Sinon.stub(CarService.prototype, "create");
      serviceStub.resolves(carMock);
    });

    after(() => {
      serviceStub.restore();
    });

    it("successfully created car", async () => {
      const response = await chai
        .request(server.app)
        .post(`${carController.route}`)
        .send(carMock);

      expect(response).to.have.status(201);
      expect(response.body).to.be.an("object");

      expect(response.body).to.have.property("model");
      expect(response.body).to.have.property("year");
      expect(response.body).to.have.property("color");
      expect(response.body).to.have.property("buyValue");
      expect(response.body).to.have.property("doorsQty");
      expect(response.body).to.have.property("seatsQty");
    });
  });
})