import { parse } from "csv-parse";
import fs from "fs";

import { type CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoriesUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

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
      throw new Error("File not found!");
    }

    const categories = await this.loadCategories(file);
    categories.forEach((category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({ name, description });
      }
    });
  }
}

export { ImportCategoriesUseCase };
