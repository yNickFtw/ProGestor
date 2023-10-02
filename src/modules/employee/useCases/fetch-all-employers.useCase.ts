import { injectable, inject } from "tsyringe";
import { IFetchAllEmployers } from "../../../shared/interfaces/useCases/employers/IFetchAllEmployers";
import { IAppError } from "../../../shared/interfaces/errors/IAppError";
import { IEmployee } from "../../../shared/interfaces/schemas/IEmployee";
import { IEmployeeRepository } from "../../../shared/interfaces/repositories/IEmployeeRepository";
import { ICompanyRepository } from "../../../shared/interfaces/repositories/ICompanyRepository";

@injectable()
export default class FetchAllEmployersUseCase implements IFetchAllEmployers, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("EmployeeRepository")
    private employeeRepository: IEmployeeRepository,
    @inject("CompanyRepository")
    private companyRepository: ICompanyRepository
  ) {
    this.statusCode = 400;
    this.message = "";
  };
  
  public async execute(companyId: number): Promise<IEmployee[] | []> {
    const company = await this.companyRepository.findById(companyId)

    if(!company) {
      const error: IAppError = {
        statusCode: 404,
        message: "Empresa não encontrada!"
      };

      throw error;
    };

    const employers: IEmployee[] = await this.employeeRepository.fetchAllEmployers(companyId);

    return employers;
  };
}
