import { Router } from "express";

// @Import all controllers
import CreateCompanyController from "../controllers/create-company.controller";
import UpdateCompanyController from "../controllers/update-company.controller";
import ChangeImageController from "../controllers/change-image.controller";

//@Import all middlewares
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";

export default class CompanyRouter {
  companyRouter: Router

  constructor() {
    this.companyRouter = Router()
    this.companyRouter.post('/create', checkIfIsAuthenticate, new CreateCompanyController().execute)
    this.companyRouter.put('/update/:id', checkIfIsAuthenticate, new UpdateCompanyController().execute)
    this.companyRouter.put('/change/image/:id', checkIfIsAuthenticate, new ChangeImageController().execute)
  };

  public execute() {
    return this.companyRouter;
  }
};
