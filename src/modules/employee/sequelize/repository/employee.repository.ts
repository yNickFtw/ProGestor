import { Employee } from "../entities/employee.schema";
import { IEmployee } from "../../../../shared/interfaces/schemas/IEmployee";
import { IEmployeeRepository } from "../../../../shared/interfaces/repositories/IEmployeeRepository";
import { User } from "../../../users/sequelize/entities/user.schema";

export default class EmployeeRepository implements IEmployeeRepository {
  public async create(userId: number, companyId: number): Promise<void> {
    await Employee.create({... { userId, companyId }});
    
    return;
  };

  public async fetchAllEmployers(companyId: number): Promise<IEmployee[] | []> {
    const employers = await Employee.findAll({ where: { companyId }, include: [{ model: User }] });

    return employers as unknown as IEmployee[];
  };

  public async findByUserIdAndCompanyId(userId: number, companyId: number): Promise<IEmployee | null> {
    const employee = await Employee.findOne({ where: { userId, companyId } });

    return employee as unknown as IEmployee;
  }

};
