import { Router } from "express";

// @Import all controllers
import CreateProjectController from "../controllers/create-project.controller";

export default class ProjectRouter {
  projectRouter: Router;

  constructor() {
    this.projectRouter = Router()
    this.projectRouter.post('/create', new CreateProjectController().execute)
  };

  public execute() {
    return this.projectRouter;
  };
};
