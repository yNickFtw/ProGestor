import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { container } from "tsyringe";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import UpdateCompanyUseCase from "../useCases/update-company.useCase";

export default class UpdateCompanyController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const { id } = req.params;

      const { description, instagram, facebook, tiktok, phone, whatsapp } = req.body;

      const updateCompanyUseCase = container.resolve(UpdateCompanyUseCase);

      await updateCompanyUseCase.execute(description, instagram, facebook, tiktok, phone, whatsapp, userId, parseInt(id));

      return res.status(200).json({ message: "Dados atualizados com sucesso!" });
    } catch (error: any) {
      if (error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: error.message });
      }
    }
  }
}
