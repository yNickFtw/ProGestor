import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { container } from "tsyringe";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import ImageUseCase from "../useCases/change-profile-image.useCase";

export default class ImageController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const { firebaseUrl, filename } = req.file as any;

      const imageUsecase = container.resolve(ImageUseCase);

      await imageUsecase.execute(firebaseUrl, filename, userId);

      return res.status(200).json({ message: "Foto da empresa alterada!" });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" })
      }
    }
  }
}
