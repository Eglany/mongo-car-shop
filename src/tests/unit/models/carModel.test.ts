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

describe("Test CarModel", () => {
  let modelStub: Sinon.SinonStub;
  // let isValidIdStub: Sinon.SinonStub;

  describe("method create", () => {
    before(() => {
      modelStub = Sinon.stub(Mongoose.Model, "create");
      modelStub.resolves(carMock);
    });

    after(() => {
      modelStub.restore();
    });

    it("successfully created car", async () => {
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

  describe("method read", () => {
    before(() => {
      modelStub = Sinon.stub(Mongoose.Model, "find");
      modelStub.resolves(carsMock);
    });

    after(() => {
      modelStub.restore();
    });

    it("successfully find all car", async () => {
      const foundCars = await carModel.read();

      expect(foundCars).to.be.an("array");
      expect(foundCars[0]).to.be.an("object");

      expect(foundCars[0]).to.have.property("model");
      expect(foundCars[0]).to.have.property("year");
      expect(foundCars[0]).to.have.property("color");
      expect(foundCars[0]).to.have.property("buyValue");
      expect(foundCars[0]).to.have.property("doorsQty");
      expect(foundCars[0]).to.have.property("seatsQty");
    });
  });
})