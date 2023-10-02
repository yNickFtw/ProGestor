import { ICustomer } from "../schemas/ICustomer"

export interface ICustomerRepository {
  create: (firstName: string, lastName: string, email: string, profilePicture: string, phone: string, note: string, companyId: number, userId: number) => Promise<void>;
  findAll: (companyId: number) => Promise<ICustomer[] | []>;
  findById: (customerId: number) => Promise<ICustomer | null>;
}