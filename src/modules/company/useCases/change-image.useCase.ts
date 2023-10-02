import { injectable, inject } from "tsyringe";
import { IChangeImageUseCase } from "../../../shared/interfaces/useCases/company/IChangeImageUseCase";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";

@injectable()
export default class ChangeImageUseCase implements IChangeImageUseCase, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository
  ) {
    this.statusCode = 400
    this.message = ""
  }

  public async execute(brandImage: string, brandImageFilename: string, companyId: number): Promise<void> {
    const company = await this.companyRepository.findById(companyId)

    if(!company) {
      const error: IAppError = {
        statusCode: 404,
        message: "Empresa não encontrada!"
      };

      throw error;
    }

    if(!brandImage || !brandImageFilename) {
      const error: IAppError = {
        statusCode: 400,
        message: "Você precisa enviar alguma imagem."
      }
    }

    await this.companyRepository.changeBrandImage(brandImage, brandImageFilename, companyId);

    return;
  }
  
}