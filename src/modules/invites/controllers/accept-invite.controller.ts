import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import { container } from "tsyringe";
import AcceptInviteUseCase from "../useCases/accept-invite.useCase";

export default class AcceptInviteController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const { companyId, inviteId } = req.params;

      const acceptInviteUseCase = container.resolve(AcceptInviteUseCase);

      await acceptInviteUseCase.execute(userId, parseInt(companyId), parseInt(inviteId));

      return res.status(201).json({ message: "Convite aceito com sucesso!" });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};
