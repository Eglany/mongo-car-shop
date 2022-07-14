import { expect } from "chai";
import Mongoose from "mongoose";
import Sinon from "sinon";
import CarModel from "../../../models/CarModel";


const carModel = new CarModel();

const carMock = {
	model: 'cruze',
	year: 2015,
	color: 'gray',
	status: false,
	buyValue: 80000,
	doorsQty: 1,
	seatsQty: 5
}

describe("Test CarModel", () => {
  let modelStub: Sinon.SinonStub;
  // let isValidIdStub: Sinon.SinonStub;

  describe("Test method .create", () => {
    before(() => {
      modelStub = Sinon.stub(Mongoose.Model, "create");
      modelStub.resolves(carMock);
    });

    after(() => {
      modelStub.restore();
    });

    it("Success case", async () => {
      const createdCar = await carModel.create(carMock);

      expect(createdCar).to.be.an("object");
      expect(createdCar).to.have.property("model");
      expect(createdCar).to.have.property("year");
      expect(createdCar).to.have.property("color");
      expect(createdCar).to.have.property("buyValue");
      expect(createdCar).to.have.property("doorsQty");
      expect(createdCar).to.have.property("seatsQty");
    });
  });
})