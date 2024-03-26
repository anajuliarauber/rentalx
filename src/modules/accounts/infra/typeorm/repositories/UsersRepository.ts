import { type Repository } from "typeorm";

import { type ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { type IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppDataSource } from "@shared/infra/typeorm/database";

class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>;
  constructor() {
    this.repository = AppDataSource.getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        id,
      },
    });

    return user;
  }

  async create({
    name,
    driver_license,
    email,
    password,
    avatar,
    id,
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      driver_license,
      email,
      password,
      avatar,
      id,
    });

    await this.repository.save(user);
  }
}

export { UsersRepository };
