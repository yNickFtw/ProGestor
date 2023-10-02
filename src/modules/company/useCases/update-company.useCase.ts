import { injectable, inject } from "tsyringe";
import { IUpdateCompany } from "../../../shared/interfaces/useCases/company/IUpdateCompany";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";

@injectable()
export default class UpdateCompanyUseCase implements IUpdateCompany, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
  ) {
    this.statusCode = 400,
    this.message = ""
  }

  public async execute(description: string, instagram: string, facebook: string, tiktok: string, phone: string, whatsapp: string, userId: number, companyId: number): Promise<void> {
    const [user, company] = await Promise.all([
      await this.userRepository.findById(userId),
      await this.companyRepository.findById(companyId)
    ])

    if(!user) {
      const error: IAppError = {
        statusCode: 401,
        message: "Sessão expirada, faça login novamente"
      };

      throw error;
    }

    if(!company) {
      const error: IAppError = {
        statusCode: 400,
        message: "Essa empresa não existe mais!"
      };

      throw error;
    }

    await this.companyRepository.updateCompanyById(description, instagram, facebook, tiktok, phone, whatsapp, companyId);

    return;
  }

}
