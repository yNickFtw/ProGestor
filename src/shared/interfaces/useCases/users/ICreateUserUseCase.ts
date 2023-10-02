export interface ICreateUserUseCase {
  execute: (firstName: string, surname: string, email: string, password: string, confirmPassword: string) => Promise<void>;
}
