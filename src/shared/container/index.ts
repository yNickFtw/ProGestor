import { container } from "tsyringe";
// @all-@Interfaces-&-@Repositories
import { IUserRepository } from "../interfaces/repositories/IUserRepository";
import UserRepository from "../../modules/users/sequelize/repository/user.repository";
import { ICompanyRepository } from "../interfaces/repositories/ICompanyRepository";
import CompanyRepository from "../../modules/company/sequelize/repository/company.repository";
import { IProjectRepository } from "../interfaces/repositories/IProjectRepository";
import ProjectRepository from "../../modules/projects/sequelize/repository/ProjectRepository";
import { ICustomerRepository } from "../interfaces/repositories/ICustomerRepository";
import CustomerRepository from "../../modules/customers/sequelize/repository/customer.repository";
import { IEmployeeRepository } from "../interfaces/repositories/IEmployeeRepository";
import EmployeeRepository from "../../modules/employee/sequelize/repository/employee.repository";

container.register<IUserRepository>(
  "UserRepository",
  UserRepository
);

container.register<ICompanyRepository>(
  "CompanyRepository",
  CompanyRepository
);

container.register<IProjectRepository>(
  "ProjectRepository",
  ProjectRepository
);

container.register<IEmployeeRepository>(
  "EmployeeRepository",
  EmployeeRepository
);

container.register<ICustomerRepository>(
  "CustomerRepository",
  CustomerRepository
);
