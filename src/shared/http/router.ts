import { Router } from "express";
import UserRouter from "../../modules/users/router/user.router";
import CompanyRouter from "../../modules/company/router/company.router";
import ProjectRouter from "../../modules/projects/router/project.router";
import InviteRouter from "../../modules/invites/router/invite.router";
import CustomerRouter from "../../modules/customers/router/customer.router";
import EmployeeRouter from "../../modules/employee/router/employee.router";

const router = Router();

router.use('/users', new UserRouter().execute());
router.use('/companies', new CompanyRouter().execute());
router.use('/projects', new ProjectRouter().execute());
router.use('/invites', new InviteRouter().execute());
router.use('/customers', new CustomerRouter().execute());
router.use('/employers', new EmployeeRouter().execute());

export default router;