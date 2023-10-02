export interface ICreateCustomerUseCase {
  execute: (firstName: string, lastName: string, email: string, profilePicture: string, phone: string, note: string, companyId: number, userId: number) => Promise<void>
}