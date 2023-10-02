export interface IUpdateCompany {
  execute: (description: string, instagram: string, facebook: string, tiktok: string, phone: string, whatsapp: string, userId: number, companyId: number) => Promise<void>;
}