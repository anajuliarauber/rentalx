import { inject, injectable } from "tsyringe"
import { compare } from "bcrypt"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { sign } from "jsonwebtoken"

interface IRequest {
  email: string
  password: string
}

interface IResponse {
  user: {
    name: string
    email: string
  }
  token: string
}


@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private readonly usersRepository: IUsersRepository
  ) {
  }
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new Error("Email or password incorrect!")
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email or password incorrect!")
    }

    // 2nd parameter generated with md5 hash
    const token = sign({}, "aa01fe069d11f4a6af82b67ca02c7450", {
      subject: user.id,
      expiresIn: "1d"
    })

    const response: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token
    }

    return response
  }
}

export { AuthenticateUserUseCase }