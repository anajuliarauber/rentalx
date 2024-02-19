import { type Request, type Response } from "express";

import { ImportCategoriesUseCase } from "./ImportCategoriesUseCase";
import { container } from "tsyringe";

class ImportCategoriesController {

  handle(request: Request, response: Response): Response {
    const { file } = request;
    const importCategoriesUseCase = container.resolve(ImportCategoriesUseCase)
    importCategoriesUseCase.execute(file);
    return response.send();
  }
}

export { ImportCategoriesController };
