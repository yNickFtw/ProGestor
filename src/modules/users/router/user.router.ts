import { Router } from "express";
// @Import all controllers
import CreateUserController from "../controllers/create-user.controller";
import AuthenticateController from "../controllers/authenticate-user.controller";
import ImageController from "../controllers/change-profile-image.controller";

// @Import all middlewares
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";
import uploadFile from "../../../shared/services/firebase-admin";
import { uploadMiddleware } from "../../../shared/middlewares/multer";
import FetchLoggedUserController from "../controllers/fetch-logged-user.controller";

export default class UserRouter {
  userRouter: Router;

  constructor() {
    this.userRouter = Router();
    this.userRouter.post("/create", new CreateUserController().execute);
    this.userRouter.post('/authenticate', new AuthenticateController().execute);
    this.userRouter.get('/logged', checkIfIsAuthenticate, new FetchLoggedUserController().execute);
    this.userRouter.post('/change/image', checkIfIsAuthenticate, uploadMiddleware, uploadFile, new ImageController().execute);
  };

  public execute() {
    return this.userRouter
  };
};
