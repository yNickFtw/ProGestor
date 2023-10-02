import { injectable, inject } from "tsyringe";
import { IAuthenticateUseCase } from "../../../shared/interfaces/useCases/users/IAuthenticateUseCase";
import { IResponseJWT } from "../../../shared/interfaces/responses/IResponseJWT";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import bcrypt from "bcryptjs";
import { generateToken } from "../../../shared/utils/generateToken";

@injectable()
export default class AuthenticateUseCase
  implements IAuthenticateUseCase, IAppError
{
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {
    this.statusCode = 400,
    this.message = ""
  }

  public async execute(email: string, password: string): Promise<IResponseJWT | IAppError> {
    if (!email || !password) {
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha todos os campos!",
      };

      throw error;
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      const error: IAppError = {
        statusCode: 400,
        message: "Usuário não encontrado!",
      };

      throw error;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      const error: IAppError = {
        statusCode: 400,
        message: "Senha incorreta!",
      };

      throw error;
    }

    return await generateToken("7d", user.id!);
  }
}
