import { injectable, inject } from "tsyringe";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { IFetchLoggedUserUseCase } from "../../../shared/interfaces/useCases/users/IFetchLoggedUserUseCase";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUser } from "../../../shared/interfaces/schemas/IUser";

@injectable()
export default class FetchLoggedUserUseCase implements IFetchLoggedUserUseCase, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {
    this.statusCode = 400;
    this.message = "";
  };

  public async execute(userId: number): Promise<IUser | null> {
    const user = await this.userRepository.findById(userId)

    return user;
  };
};
