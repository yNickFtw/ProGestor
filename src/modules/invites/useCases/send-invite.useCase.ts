import { injectable, inject } from "tsyringe";
import { ISendInviteUseCase } from "../../../shared/interfaces/useCases/invite/ISendInviteUseCase";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { IInviteRepository } from "../../../shared/interfaces/repositories/IInviteRepository";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";

@injectable()
export default class SendInviteUseCase
  implements ISendInviteUseCase, IAppError
{
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
    @inject("InviteRepository")
    private inviteRepository: IInviteRepository
  ) {
    this.statusCode = 400;
    this.message = "";
  };

  public async execute(loggedUserId: number, companyId: number, userId: number): Promise<void> {
    const [loggedUser, userToInvite, company] = await Promise.all([
      await this.userRepository.findById(loggedUserId),
      await this.userRepository.findById(userId),
      await this.companyRepository.findById(companyId),
    ]);

    if (!loggedUser) {
      const error: IAppError = {
        statusCode: 401,
        message: "Sessão expirada, faça login novamente!",
      };

      throw error;
    };

    if (!userToInvite) {
      const error: IAppError = {
        statusCode: 404,
        message: "Usuário para convite não encontrado!",
      };

      throw error;
    };

    if (!company) {
      const error: IAppError = {
        statusCode: 404,
        message: "Ocorreu um erro, tente novamente mais tarde!",
      };

      throw error;
    };

    await this.inviteRepository.send(userId, companyId, loggedUserId);

    return;
  };
};
