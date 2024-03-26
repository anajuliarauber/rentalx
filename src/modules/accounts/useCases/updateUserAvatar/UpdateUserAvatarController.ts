import { type Request, type Response } from "express";
import { container } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const avatarFile = request.file?.filename;

    if (!avatarFile) {
      throw new AppError("File is required!", 400);
    }

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ avatarFile, userId: id });

    return response.status(204).send();
  }
}

export { UpdateUserAvatarController };
