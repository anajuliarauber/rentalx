import { Specification } from "../../entities/Specification";
import {
  type ISpecificationsRepository,
  type ICreateSpecificationDTO,
} from "../ISpecificationsRepository";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../database";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

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
