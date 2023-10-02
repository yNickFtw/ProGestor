import { ICompanyRepository } from "../../../../shared/interfaces/repositories/ICompanyRepository";
import { ICompany } from "../../../../shared/interfaces/schemas/ICompany";
import { Company } from "../entities/company.schema";

export default class CompanyRepository implements ICompanyRepository {
  public async create(name: string, description: string, userId: number): Promise<void> {
    await Company.create({ ... { name, description, userId } });

    return;
  };

  public async findByNameWithUserId(name: string, userId: number): Promise<ICompany | undefined> {
    const company = await Company.findOne({ where: { name: name, userId: userId } });

    return company as unknown as ICompany;
  };

  public async countCompaniesByUserId(userId: number): Promise<number> {
    const qtd: number = await Company.count({ where: { userId: userId } });

    return qtd;
  };

  public async changeBrandImage(brandImage: string, brandImageFilename: string, companyId: number): Promise<void> {
    await Company.update({ ...{ brandImage, brandImageFilename } }, { where: { id: companyId } });

    return;
  };

  public async findById(id: number): Promise<ICompany | null> {
    const company = await Company.findOne({ where: { id: id } });

    return company as unknown as ICompany;
  };

  public async updateCompanyById(description: string, instagram: string, facebook: string, tiktok: string, phone: string, whatsapp: string, companyId: number): Promise<void> {
    await Company.update({ ... { description, instagram, facebook, tiktok, phone, whatsapp } }, { where: { id: companyId } });
  
    return;
  }

}