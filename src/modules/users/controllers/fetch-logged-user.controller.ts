import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { container } from "tsyringe";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import FetchLoggedUserUseCase from "../useCases/fetch-logged-user.useCase";

export default class FetchLoggedUserController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const fetchLoggedUserUseCase = container.resolve(FetchLoggedUserUseCase)

      const user = await fetchLoggedUserUseCase.execute(userId);

      return res.status(200).json(user);
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};
