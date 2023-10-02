import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../shared/interfaces/IController";
import CreateUserUseCase from "../useCases/create-user.useCase";

export default class CreateUserController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { firstName, surname, email, password, confirmPassword } = req.body;

      const createUserUseCase = container.resolve(CreateUserUseCase);

      await createUserUseCase.execute(firstName, surname, email, password, confirmPassword);

      return res.status(201).json({ message: "Cadastrado com sucesso!" });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};