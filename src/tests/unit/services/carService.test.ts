import { expect } from "chai";
import Sinon from "sinon";
import CarModel from "../../../models/CarModel";
import CarService from "../../../services/CarService";


const carService = new CarService();

const carMock = {
	model: 'cruze',
	year: 2015,
	color: 'gray',
	status: false,
	buyValue: 80000,
	doorsQty: 4,
	seatsQty: 5
}

describe("Test CarService", () => {
  let modelStub: Sinon.SinonStub;

  describe("method create", () => {
    before(() => {
      modelStub = Sinon.stub(CarModel.prototype, "create");
      modelStub.resolves(carMock);
    });

    after(() => {
      modelStub.restore();
    });

    it("successfully created car", async () => {
      const createdCar = await carService.create(carMock);

      expect(createdCar).to.be.an("object");
      
      expect(createdCar).to.have.property("model");
      expect(createdCar).to.have.property("year");
      expect(createdCar).to.have.property("color");
      expect(createdCar).to.have.property("buyValue");
      expect(createdCar).to.have.property("doorsQty");
      expect(createdCar).to.have.property("seatsQty");
    });
  })
})