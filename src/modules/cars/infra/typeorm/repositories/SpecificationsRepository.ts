import { type Repository } from "typeorm";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import {
  type ISpecificationsRepository,
  type ICreateSpecificationDTO,
} from "@modules/cars/repositories/ISpecificationsRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";

class SpecificationsRepository implements ISpecificationsRepository {
  private readonly repository: Repository<Specification>;

  constructor() {
    this.repository = AppDataSource.getRepository(Specification);
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
    const category = this.repository.create({ description, name });

    await this.repository.save(category);
  }

  async findByName(name: string): Promise<Specification | null> {
    const specification = await this.repository.findOne({
      where: { name },
    });
    return specification;
  }
}

export { SpecificationsRepository };
