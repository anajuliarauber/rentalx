import { type Category } from "../infra/typeorm/entities/Category";

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName: (name: string) => Promise<Category | null>;
  list: () => Promise<Category[]>;
  create: ({ description, name }: ICreateCategoryDTO) => Promise<void>;
}

export type { ICategoriesRepository, ICreateCategoryDTO };
