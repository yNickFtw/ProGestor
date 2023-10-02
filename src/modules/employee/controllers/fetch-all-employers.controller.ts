import { Request, Response } from 'express';
import { IController } from '../../../shared/interfaces/IController';
import { container } from 'tsyringe';
import FetchAllEmployersUseCase from '../useCases/fetch-all-employers.useCase';

export default class FetchAllEmployersController implements IController {
  public async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { companyId } = req.params;

      const fetchAllEmployers = container.resolve(FetchAllEmployersUseCase);

      const employers = await fetchAllEmployers.execute(parseInt(companyId));

      return res.status(200).json(employers);
    } catch (error: any) {
      if(error.statusCode && error.message) {
        return res.status(error.statusCode).json({ message: error.message });
      } else {
        return res.status(500).json({ message: "Ocorreu um erro interno no servidor, tente novamente mais tarde!" });
      };
    };
  };
};
