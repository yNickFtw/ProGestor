export interface IChangeImageUseCase {
  execute: (brandImage: string, brandImageFilename: string, companyId: number) => Promise<void>
}