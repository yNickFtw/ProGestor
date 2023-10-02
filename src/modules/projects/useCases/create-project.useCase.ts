import { injectable, inject } from "tsyringe";
import { ICreateProjectUseCase } from "../../../shared/interfaces/useCases/project/ICreateProjectUseCase";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IProjectRepository } from "../../../shared/interfaces/repositories/IProjectRepository";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";

@injectable()
export default class CreateProjectUseCase implements ICreateProjectUseCase, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("ProjectRepository")
    private projectRepository: IProjectRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository
  ) {
    this.statusCode = 400,
    this.message = ""
  }
  
  public async execute(name: string, description: string, userId: number, companyId: number): Promise<void> {
    if(!name) {
      const error: IAppError = {
        statusCode: 400,
        message: "Você precisa adicionar um nome para o projeto!"
      }

      throw error;
    };
    
    const [user, company] = await Promise.all([
      await this.userRepository.findById(userId),
      await this.companyRepository.findById(companyId)
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
        message: "Empresa não encontrada!"
      };

      throw error;
    };

    await this.projectRepository.create(name, description, userId, companyId);

    return;
  };
};
