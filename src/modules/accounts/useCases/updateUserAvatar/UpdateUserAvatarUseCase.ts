import { inject, injectable } from "tsyringe";

import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userId: string;
  avatarFile: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute({ avatarFile, userId }: IRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (user) {
      if (user.avatar) {
        await deleteFile(`./tmp/avatar/${user?.avatar}`);
      }

      user.avatar = avatarFile;

      await this.usersRepository.create(user);
    }
  }
}

export { UpdateUserAvatarUseCase };
