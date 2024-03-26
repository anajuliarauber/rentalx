import { type Repository } from "typeorm";

import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import {
  type ICategoriesRepository,
  type ICreateCategoryDTO,
} from "@modules/cars/repositories/ICategoriesRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";

class CategoriesRepository implements ICategoriesRepository {
  private readonly repository: Repository<Category>;

  constructor() {
    this.repository = AppDataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({ description, name });

    await this.repository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository.findOne({
      where: { name },
    });
    return category;
  }
}

export { CategoriesRepository };
