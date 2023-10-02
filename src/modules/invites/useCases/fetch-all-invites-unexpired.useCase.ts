import { injectable, inject } from "tsyringe";
import { IInvite } from "../../../shared/interfaces/schemas/IInvite";
import { IFetchAllInvitesUnexpired } from "../../../shared/interfaces/useCases/invite/IFetchAllInvitesUnexpired";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { IInviteRepository } from "../../../shared/interfaces/repositories/IInviteRepository";

@injectable()
export default class FetchAllInvitesUnexpiredUseCase implements IFetchAllInvitesUnexpired, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("InviteRepository")
    private inviteRepository: IInviteRepository
  ) {
    this.statusCode = 400;
    this.message = "";
  }

  public async execute(userId: number): Promise<IInvite[] | []> {
    const user = await this.userRepository.findById(userId)

    if(!user) {
      const error: IAppError = {
        statusCode: 401,
        message: "Sessão expirada, faça login novamente!"
      };

      throw error;
    }

    const invites = await this.inviteRepository.unexpiredInvites(userId)

    return invites;
  };
}
