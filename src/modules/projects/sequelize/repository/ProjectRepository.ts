import { IProject } from "../../../../shared/interfaces/schemas/IProject";
import { IProjectRepository } from "../../../../shared/interfaces/repositories/IProjectRepository";
import { Project } from "../entities/project.schema";

export default class ProjectRepository implements IProjectRepository {
  public async create(name: string, description: string, userId: number, companyId: number): Promise<void> {
    await Project.create({ ... { name, description, userId, companyId } })
    
    return;
  };

  public async findById(id: number): Promise<IProject | undefined> {
    const project = await Project.findOne({ where: { id: id } })
    
    return project as unknown as IProject;
  };

  public async findAllByCompanyId(companyId: number): Promise<IProject[]> {
    const projects = await Project.findAll({ where: { companyId: companyId } })
  
  
    return projects as unknown as IProject[]
  }

};