// @Schemas
import { User } from "../modules/users/sequelize/entities/user.schema";
import { Company } from "../modules/company/sequelize/entities/company.schema";
import { Project } from "../modules/projects/sequelize/entities/project.schema";
import { Employee } from "../modules/employee/sequelize/entities/employee.schema";
import { Invite } from "../modules/invites/sequelize/entities/invite.schema";
import { Customer } from "../modules/customers/sequelize/entities/Customer";

export default class AssociationConfig {
  public execute(cb: Function) {
    User.hasMany(Company);
    Company.belongsTo(User);

    User.hasMany(Project);
    Project.belongsTo(User);

    Company.hasMany(Project);
    Project.belongsTo(Company);

    Company.hasMany(Employee);
    Employee.belongsTo(Employee);

    User.hasMany(Employee);
    Employee.belongsTo(User);

    Invite.belongsTo(User, { foreignKey: "userId", as: "user" });

    Invite.belongsTo(User, { foreignKey: "senderId", as: "sender" });

    User.hasMany(Customer);
    User.belongsTo(Customer);

    Company.hasMany(Customer);
    Customer.belongsTo(Company);

    cb();
  }
}
