import { injectable, inject } from "tsyringe";
import { ICreateCompany } from "../../../shared/interfaces/useCases/company/ICreateCompany";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";

@injectable()
export default class CreateCompanyUseCase implements ICreateCompany, IAppError {
  statusCode: number;
  message: string;
  
  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository
  ){
    this.statusCode = 400,
    this.message = ""
  };

  public async execute(name: string, description: string, userId: number): Promise<void> {
    if(!name || !description) {
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha todos os campos!"
      };

      throw error;
    }

    const user = await this.userRepository.findById(userId)

    if(!user) {
      const error: IAppError = {
        statusCode: 401,
        message: "Sessão expirada, faça login novamente!"
      }
      
      throw error;
    };

    const companiesQtd = await this.companyRepository.countCompaniesByUserId(userId)

    if(!user.isPremium && companiesQtd > 1) {
      const error: IAppError = {
        statusCode: 403,
        message: "Você atingiu o limite de empresas criadas!"
      }

      throw error;
    };

    await this.companyRepository.create(name, description, userId);

    return
  };
};
