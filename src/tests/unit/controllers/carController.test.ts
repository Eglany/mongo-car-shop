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

const carsMock = [{
	model: 'cruze',
	year: 2015,
	color: 'gray',
	status: false,
	buyValue: 80000,
	doorsQty: 4,
	seatsQty: 5
},
{
	model: 'fusca',
	year: 1998,
	color: 'red',
	status: false,
	buyValue: 20000,
	doorsQty: 2,
	seatsQty: 2
}]

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

  describe("method read", () => {
    before(() => {
      serviceStub = Sinon.stub(CarService.prototype, "read");
      serviceStub.resolves(carsMock);
    });

    after(() => {
      serviceStub.restore();
    });

    it("successfully find all car", async () => {
      const response = await chai
        .request(server.app)
        .get(`${carController.route}`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an("array");
      expect(response.body[0]).to.be.an("object");

      expect(response.body[0]).to.have.property("model");
      expect(response.body[0]).to.have.property("year");
      expect(response.body[0]).to.have.property("color");
      expect(response.body[0]).to.have.property("buyValue");
      expect(response.body[0]).to.have.property("doorsQty");
      expect(response.body[0]).to.have.property("seatsQty");
    });
  });
})