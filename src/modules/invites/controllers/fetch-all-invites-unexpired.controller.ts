import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import { container } from "tsyringe";
import FetchAllInvitesUnexpiredUseCase from "../useCases/fetch-all-invites-unexpired.useCase";

export default class FetchAllInvitesUnexpiredController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const fetchAllInvitesUnexpiredUseCase = container.resolve(FetchAllInvitesUnexpiredUseCase);

      const invites = await fetchAllInvitesUnexpiredUseCase.execute(userId);

      return res.status(200).json(invites);
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};
