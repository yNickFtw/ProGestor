import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { container } from "tsyringe";

export default class UpdateProjectController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const { name, description } = req.body;

      

      return res.status(200).json({ message: "Projeto editado com sucesso!" })
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message })
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno, tente novamente mais tarde!" })
      };
    };
  };
};
