import { Router } from "express";

import SendInviteController from "../controllers/send-invite.controller";
import { checkIfIsAuthenticate } from "../../../shared/middlewares/CheckIfUserIsAuthenticated";
import FetchAllInvitesUnexpiredController from "../controllers/fetch-all-invites-unexpired.controller";

export default class InviteRouter {
  router: Router

  constructor() {
    this.router = Router();
    this.router.post('/send/invite/:id', checkIfIsAuthenticate, new SendInviteController().execute);
    this.router.get('/all/unexpired', checkIfIsAuthenticate, new FetchAllInvitesUnexpiredController().execute);
  }

  public execute() {
    return this.router;
  }
}
