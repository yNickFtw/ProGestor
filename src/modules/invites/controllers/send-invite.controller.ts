import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import { container } from "tsyringe";
import SendInviteUseCase from "../useCases/send-invite.useCase";

export default class SendInviteController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const loggedUserId = getUserIdFromToken(token) as number;

      const { companyId, userId } = req.params;

      const sendInviteUseCase = container.resolve(SendInviteUseCase);

      await sendInviteUseCase.execute(loggedUserId, parseInt(companyId), parseInt(userId));

      return res.status(201).json({ message: "Convite enviado com sucesso!" });
    } catch (error: any) {
      if (error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro, tente novamente mais tarde!" });
      }
    }
  }
}
