import { type Repository } from "typeorm";

import { type ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private readonly repository: Repository<Car>;
  constructor() {
    this.repository = AppDataSource.getRepository(Car);
  }

  async create({
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    name,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      name,
    });
    await this.repository.save(car);
    return car;
  }

  async findByLicensePlate(licensePlate: string): Promise<Car> {
    const car = await this.repository.findOne({
      where: {
        license_plate: licensePlate,
      },
    });

    return car as Car;
  }
}

export { CarsRepository };
