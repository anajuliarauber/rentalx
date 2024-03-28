import { type ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";

import { type ICarsRepository } from "../ICarsRepository";

class CarsRepositoryMock implements ICarsRepository {
  cars: Car[] = [];

  async create(data: ICreateCarDTO): Promise<Car> {
    const car = new Car();
    Object.assign(car, data);

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = this.cars.find((car) => car.license_plate === licensePlate);

    return car as Car;
  }
}
export { CarsRepositoryMock };
