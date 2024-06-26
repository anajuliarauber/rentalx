import { inject, injectable } from "tsyringe";

import { SpecificationsRepository } from "@modules/cars/infra/typeorm/repositories/SpecificationsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private readonly specificationsRepository: SpecificationsRepository,
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError("Specification already exists!", 409);
    }

    await this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
