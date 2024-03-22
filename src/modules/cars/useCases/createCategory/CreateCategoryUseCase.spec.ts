import { AppError } from "../../../../errors/AppError";
import { CategoriesRepositoryMock } from "../../repositories/mock/CategoriesRepositoryMock";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryMock;

describe("Create category", () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryMock();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });
  it("should be able to create a new category", async () => {
    const category = {
      name: "Category Test",
      description: "Category description Test",
    };

    await createCategoryUseCase.execute(category);
    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toHaveProperty("id");
  });

  it("should throw error if category already exists", async () => {
    void expect(async () => {
      const category = {
        name: "Category Test",
        description: "Category description Test",
      };

      await createCategoryUseCase.execute(category);
      await createCategoryUseCase.execute(category);
    }).rejects.toBeInstanceOf(AppError);
  });
});
