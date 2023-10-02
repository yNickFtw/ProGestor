import { ICustomerRepository } from "../../../../shared/interfaces/repositories/ICustomerRepository";
import { ICustomer } from "../../../../shared/interfaces/schemas/ICustomer";
import { Customer } from "../entities/Customer";

export default class CustomerRepository implements ICustomerRepository {
  public async create(firstName: string, lastName: string, email: string, profilePicture: string, phone: string, note: string, companyId: number, userId: number): Promise<void> {
    await Customer.create({ ... { firstName, lastName, email, profilePicture, phone, note, companyId, userId } });

    return;
  };

  public async findAll(companyId: number): Promise<ICustomer[] | []> {
    const customers = await Customer.findAll({ where: { companyId: companyId } });

    return customers as unknown as ICustomer[]
  }

  public async findById(customerId: number): Promise<ICustomer | null> {
    const customer = await Customer.findOne({ where: { id: customerId } });

    return customer as unknown as ICustomer;
  }
}
