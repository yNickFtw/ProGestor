import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../shared/interfaces/IController";
import CreateCompanyUseCase from "../useCases/create-company.useCase";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";

export default class CreateCompanyController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const { name, description } = req.body;
      
      const createCompanyUseCase = container.resolve(CreateCompanyUseCase);

      await createCompanyUseCase.execute(name, description, userId);

      return res.status(201).json({ message: "Empresa criada com sucesso" });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};
