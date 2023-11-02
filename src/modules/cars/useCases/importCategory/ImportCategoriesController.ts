import { type Request, type Response } from "express";

import { type ImportCategoriesUseCase } from "./ImportCategoriesUseCase";

class ImportCategoriesController {
  constructor(
    private readonly importCategoriesUseCase: ImportCategoriesUseCase,
  ) {}

  handle(request: Request, response: Response): Response {
    const { file } = request;
    this.importCategoriesUseCase.execute(file);
    return response.send();
  }
}

export { ImportCategoriesController };
