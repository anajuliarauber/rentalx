import { Category } from "../../entities/Category";
import {
  type ICreateCategoryDTO,
  type ICategoriesRepository,
} from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = [];
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category as Category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async create({ description, name }: ICreateCategoryDTO): Promise<void> {
    const category = new Category();
    Object.assign(category, { name, description });

    this.categories.push(category);
  }
}

export { CategoriesRepositoryInMemory };
