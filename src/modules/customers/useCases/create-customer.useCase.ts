import { injectable, inject } from "tsyringe";
import { ICreateCustomerUseCase } from "../../../shared/interfaces/useCases/customers/ICreateCustomerUseCase";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IUserRepository } from "../../../shared/interfaces/repositories/IUserRepository";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";
import { ICustomerRepository } from "../../../shared/interfaces/repositories/ICustomerRepository";

@injectable()
export default class CreateCustomerUseCase implements ICreateCustomerUseCase, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository,
    @inject("CustomerRepository")
    private customerRepository: ICustomerRepository
  ) {
    this.statusCode = 400,
    this.message = ""
  };

  public async execute(firstName: string, lastName: string, email: string, profilePicture: string, phone: string, note: string, companyId: number, userId: number): Promise<void> {
    if(!firstName || lastName) {
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha o nome do cliente!"
      };

      throw error;
    };

    if(!email) {
      const error: IAppError = {
        statusCode: 400,
        message: "Informe o email do cliente"
      };

      throw error;
    }

    const [user, company] = await Promise.all([
      await this.userRepository.findById(userId),
      await this.companyRepository.findById(companyId)
    ])

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
        message: "Empresa não encontrada, tente novamente mais tarde!"
      };

      throw error;
    };

    await this.customerRepository.create(firstName, lastName, email, profilePicture, phone, note, companyId, userId);

    return;
  };
}
