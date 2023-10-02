import { ICompany } from "../schemas/ICompany";

export interface ICompanyRepository {
  create: (name: string, description: string, userId: number) => Promise<void>;
  findByNameWithUserId: (name: string, userId: number) => Promise<ICompany | undefined>;
  countCompaniesByUserId: (userId: number) => Promise<number>;
  changeBrandImage: (brandImage: string, brandImageFilename: string, companyId: number) => Promise<void>;
  findById: (id: number) => Promise<ICompany | null>
  updateCompanyById: (description: string, instagram: string, facebook: string, tiktok: string, phone: string, whatsapp: string, companyId: number) => Promise<void>;
}