import { AppError } from "../../../../errors/AppError";
import { type ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryMock } from "../../repositories/mock/UsersRepositoryMock";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryMock: UsersRepositoryMock;
let createUserUseCase: CreateUserUseCase;

describe("Authenticate User", () => {
  beforeEach(() => {
    usersRepositoryMock = new UsersRepositoryMock();
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryMock);
    createUserUseCase = new CreateUserUseCase(usersRepositoryMock);
  });
  it("should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "000000",
      email: "user@gmail.com",
      name: "User",
      password: "password",
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    void expect(async () => {
      await authenticateUserUseCase.execute({
        email: "usere@gmail.com",
        password: "password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to authenticate with incorrect password", () => {
    void expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: "000000",
        email: "user@gmail.com",
        name: "User",
        password: "password",
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrect password",
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
