import { IEmployee } from "../schemas/IEmployee";

export interface IEmployeeRepository {
  create: (userId: number, companyId: number) => Promise<void>;
  fetchAllEmployers: (companyId: number) => Promise<IEmployee[] | []>;
  findByUserIdAndCompanyId: (userId: number, companyId: number) => Promise<IEmployee | null>
}