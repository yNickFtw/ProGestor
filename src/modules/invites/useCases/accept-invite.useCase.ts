import { injectable, inject } from "tsyringe";
import { IAcceptInviteUseCase } from "../../../shared/interfaces/useCases/invite/IAcceptInviteUseCase";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";
import { IInviteRepository } from "../../../shared/interfaces/repositories/IInviteRepository";
import { IEmployeeRepository } from "../../../shared/interfaces/repositories/IEmployeeRepository";

@injectable()
export default class AcceptInviteUseCase implements IAcceptInviteUseCase, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
    @inject("InviteRepository")
    private inviteRepository: IInviteRepository,
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository
  ) {
    this.statusCode = 400,
    this.message = ""
  };
  
  public async execute(userId: number, companyId: number, inviteId: number): Promise<void> {
    const invite = await this.inviteRepository.findById(inviteId)

    if(!invite) {
      const error: IAppError = {
        statusCode: 400,
        message: "O convite não existe mais!"
      };

      throw error;
    };

    const [user, company, employeeAlreadyExists] = await Promise.all([
      await this.userRepository.findById(userId),
      await this.companyRepository.findById(companyId),
      await this.employeeRepository.findByUserIdAndCompanyId(userId, companyId)
    ]);

    if(!user) {
      const error: IAppError = {
        statusCode: 401,
        message: "Sessão expirada, faça login novamente!"
      };

      throw error;
    };

    if(!company) {
      const error: IAppError = {
        statusCode: 404,
        message: "Empresa não encontrada"
      };

      throw error;
    };

    if(employeeAlreadyExists) {
      const error: IAppError = {
        statusCode: 400,
        message: "Você já está nesta empresa!"
      };

      throw error;
    };

    await this.employeeRepository.create(userId, companyId)

    return;
  };
};
