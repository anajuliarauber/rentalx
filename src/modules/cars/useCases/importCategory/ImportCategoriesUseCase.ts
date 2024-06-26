import { parse } from "csv-parse";
import fs from "fs";
import { inject, injectable } from "tsyringe";

import { CategoriesRepository } from "@modules/cars/infra/typeorm/repositories/CategoriesRepository";
import { AppError } from "@shared/errors/AppError";

interface IImportCategory {
  name: string;
  description: string;
}

@injectable()
class ImportCategoriesUseCase {
  constructor(
    @inject("CategoriesRepository")
    private readonly categoriesRepository: CategoriesRepository,
  ) {}

  private async loadCategories(
    file: Express.Multer.File,
  ): Promise<IImportCategory[]> {
    return await new Promise((resolve, reject) => {
      const categories: IImportCategory[] = [];

      const strem = fs.createReadStream(file.path);

      const parseFile = parse({ delimiter: "," });

      strem.pipe(parseFile);

      parseFile
        .on("data", (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on("end", () => {
          void fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  async execute(file: Express.Multer.File | undefined): Promise<void> {
    if (!file) {
      throw new AppError("File not found!", 404);
    }

    const categories = await this.loadCategories(file);
    categories.forEach(async (category) => {
      const { name, description } = category;

      const existCategory = await this.categoriesRepository.findByName(name);

      if (!existCategory) {
        await this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoriesUseCase };
