import { User } from "@modules/accounts/infra/typeorm/entities/User";

import { type ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { type IUsersRepository } from "../IUsersRepository";

class UsersRepositoryMock implements IUsersRepository {
  users: User[] = [];

  async create(data: ICreateUserDTO): Promise<void> {
    const user = new User();
    Object.assign(user, data);

    this.users.push(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);
    return user as User;
  }

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id);
    return user as User;
  }
}

export { UsersRepositoryMock };
