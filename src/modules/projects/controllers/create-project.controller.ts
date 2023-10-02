import { Request, Response } from "express-serve-static-core";
import { IController } from "../../../shared/interfaces/IController";
import { container } from "tsyringe";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import CreateProjectUseCase from "../useCases/create-project.useCase";

export default class CreateProjectController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const { id } = req.params;
      
      const { name, description } = req.body;
      
      const createProjectUseCase = container.resolve(CreateProjectUseCase);

      await createProjectUseCase.execute(name, description, userId, parseInt(id));
      
      return res.status(201).json({ message: "Projeto criado com sucesso!" })
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" })
      };
    };
  };
};
