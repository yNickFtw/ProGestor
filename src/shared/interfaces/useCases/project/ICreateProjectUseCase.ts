export interface ICreateProjectUseCase {
  execute: (name: string, description: string, userId: number, companyId: number) => Promise<void>
}