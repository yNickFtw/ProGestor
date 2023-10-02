import { Router } from "express";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";
import FetchAllEmployersController from "../controllers/fetch-all-employers.controller";

export default class EmployeeRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.router.get('/all/:companyId', checkIfIsAuthenticate, new FetchAllEmployersController().execute);
  };

  public execute() {
    return this.router;
  }

}
