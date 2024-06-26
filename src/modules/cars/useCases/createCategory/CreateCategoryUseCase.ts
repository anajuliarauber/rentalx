import { inject, injectable } from "tsyringe";

import { type ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private readonly categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const categoryAlreadyExists =
      await this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError("Category already exists!", 409);
    }

    await this.categoriesRepository.create({ name, description });
  }
}

export { CreateCategoryUseCase };
