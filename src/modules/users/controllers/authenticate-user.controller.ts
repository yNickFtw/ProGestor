import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { container } from 'tsyringe'
import AuthenticateUseCase from "../useCases/authenticate-user.useCase";

export default class AuthenticateController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const authenticateUseCase = container.resolve(AuthenticateUseCase)

      const auth = await authenticateUseCase.execute(email, password)

      return res.status(200).json({ message: "Autenticado com sucesso!", auth });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      }
    }
  }
}

