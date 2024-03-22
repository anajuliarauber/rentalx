import { type Repository } from "typeorm";

import { AppDataSource } from "../../../../database";
import { type ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { type IUsersRepository } from "../IUsersRepository";

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
