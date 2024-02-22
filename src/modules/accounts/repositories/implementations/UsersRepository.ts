import { Repository } from "typeorm";
import { IUsersRepository } from "../IUsersRepository";
import { User } from "../../entities/User";
import { AppDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
  private readonly repository: Repository<User>
  constructor() { this.repository = AppDataSource.getRepository(User) }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        email
      }
    })

    return user
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findOne({
      where: {
        id
      }
    })

    return user
  }

  async create({
    name, driver_license, email, password, avatar, id
  }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name, driver_license, email, password, avatar, id
    })

    await this.repository.save(user)
  }
}

export { UsersRepository }