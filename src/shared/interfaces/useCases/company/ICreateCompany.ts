export interface ICreateCompany {
  execute: (name: string, description: string, userId: number) => Promise<void>;
}