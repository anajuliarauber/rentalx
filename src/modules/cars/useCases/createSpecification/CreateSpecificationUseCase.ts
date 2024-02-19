import { inject, injectable } from "tsyringe";
import { type SpecificationsRepository } from "../../repositories/implementations/SpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}
@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private readonly specificationsRepository: SpecificationsRepository,
  ) { }

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists = await
      this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error("Specification already exists!");
    }

    this.specificationsRepository.create({ name, description });
  }
}

export { CreateSpecificationUseCase };
