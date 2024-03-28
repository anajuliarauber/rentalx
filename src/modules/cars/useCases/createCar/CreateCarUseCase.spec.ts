import { CarsRepositoryMock } from "@modules/cars/repositories/mock/CarsRepositoryMock";
import { AppError } from "@shared/errors/AppError";

import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryMock;
describe("Create car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryMock();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });
  it("should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "Polo",
      description: "Ano 2019",
      daily_rate: 200,
      brand: "VW",
      category_id: "0001",
      fine_amount: 90,
      license_plate: "000000",
    });

    expect(car).toHaveProperty("id");
  });

  it("should not be able to create a car with a license plate already registered", () => {
    void expect(async () => {
      await createCarUseCase.execute({
        name: "Car 1",
        description: "Ano 2019",
        daily_rate: 200,
        brand: "VW",
        category_id: "0001",
        fine_amount: 90,
        license_plate: "000000",
      });

      await createCarUseCase.execute({
        name: "Car 2",
        description: "Ano 2019",
        daily_rate: 200,
        brand: "VW",
        category_id: "0001",
        fine_amount: 90,
        license_plate: "000000",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      name: "Car Available",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });
    expect(car.available).toBe(true);
  });
});
