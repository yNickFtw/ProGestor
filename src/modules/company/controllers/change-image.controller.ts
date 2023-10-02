import { Request, Response } from "express";
import { container } from "tsyringe";
import { IController } from "../../../shared/interfaces/IController";
import ChangeImageUseCase from "../useCases/change-image.useCase";

export default class ChangeImageController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      
      const { firebaseUrl, filename } = req.file as any;

      const changeImageUseCase = container.resolve(ChangeImageUseCase);

      await changeImageUseCase.execute(firebaseUrl, filename, parseInt(id));

      return res.status(200).json({ message: "Imagem atualizada com sucesso!" });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};
