import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { tokenSecret } from "../shared/constants/session";
import { UsersRepository } from "../modules/accounts/repositories/implementations/UsersRepository";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new Error("Tonken missing!")
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: userId } = verify(token, tokenSecret) as IPayload

    const usersRepository = new UsersRepository()
    const user = await usersRepository.findById(userId)

    if (!user) {
      throw new Error("User not found!")
    }

    next()
  } catch {
    throw new Error("Invalid token!")
  }


}