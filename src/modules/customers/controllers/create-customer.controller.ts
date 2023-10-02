import { Request, Response } from "express";
import { IController } from "../../../shared/interfaces/IController";
import { container } from "tsyringe";
import { getUserIdFromToken } from "../../../shared/utils/getUserIdFromToken";
import CreateCustomerUseCase from "../useCases/create-customer.useCase";

export default class CreateCustomerController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const token = req.headers["authorization"] as string;

      const userId = getUserIdFromToken(token) as number;

      const { companyId } = req.params;

      const { firstName, lastName, email, profilePicture, phone, note } = req.body;

      const createCustomerUseCase = container.resolve(CreateCustomerUseCase);

      await createCustomerUseCase.execute(firstName, lastName, email, profilePicture, phone, note, parseInt(companyId), userId);

      return res.status(201).json({ message: "Cliente cadastrado com sucesso!" });
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};
