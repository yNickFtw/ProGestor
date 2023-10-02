import { IProject } from "../schemas/IProject"

export interface IProjectRepository {
  create: (name: string, description: string, userId: number, companyId: number) => Promise<void>
  findById: (id: number) => Promise<IProject | undefined>;
  findAllByCompanyId: (companyId: number) => Promise<IProject[]>
}