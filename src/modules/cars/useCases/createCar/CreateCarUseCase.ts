import { inject, injectable } from "tsyringe";

import { type ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { type Car } from "@modules/cars/infra/typeorm/entities/Car";
import { type ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private readonly carsRepository: ICarsRepository,
  ) {}

  async execute({
    name,
    description,
    daily_rate,
    brand,
    category_id,
    fine_amount,
    license_plate,
  }: ICreateCarDTO): Promise<Car> {
    const carAlredyExists =
      await this.carsRepository.findByLicensePlate(license_plate);

    if (carAlredyExists) {
      throw new AppError("Car already exists", 409);
    }

    const car = await this.carsRepository.create({
      name,
      description,
      daily_rate,
      brand,
      category_id,
      fine_amount,
      license_plate,
    });

    return car;
  }
}
export { CreateCarUseCase };
