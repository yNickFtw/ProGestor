import { IEmployee } from "../../schemas/IEmployee";

export interface IFetchAllEmployers {
  execute: (companyId: number) => Promise<IEmployee[] | []>;
}