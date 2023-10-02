import { injectable, inject } from "tsyringe";
import { IImageUseCase } from "../../../shared/interfaces/useCases/users/IImageUseCase";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";

@injectable()
export default class ImageUseCase implements IImageUseCase, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {
    this.statusCode = 400,
    this.message = ""
  }

  public async execute(firebaseUrl: string, filename: string, userId: number): Promise<void> {
    const user = await this.userRepository.findById(userId)

    if(!user) {
      const error: IAppError = {
        statusCode: 401,
        message: "Sessão expirada, faça login novamente!"
      }

      throw error;
    }

    

  }

}
