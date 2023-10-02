import { Router } from "express";
import CreateCustomerController from "../controllers/create-customer.controller"; 
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";

export default class CustomerRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.router.post('/create/:companyId', checkIfIsAuthenticate, new CreateCustomerController().execute)
  };

  public execute() {
    return this.router;
  }
}