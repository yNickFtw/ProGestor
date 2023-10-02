import { injectable, inject } from 'tsyringe'
import { ICreateUserUseCase } from '../../../shared/interfaces/useCases/users/ICreateUserUseCase'
import { IAppError } from '../../../shared/interfaces/errors/IAppError'
import { IUserRepository } from '../../../shared/interfaces/repositories/IUserRepository';
import bcrypt from 'bcryptjs'

@injectable()
export default class CreateUserUseCase implements ICreateUserUseCase, IAppError {
  statusCode: number;
  message: string;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {
    this.statusCode = 400,
    this.message = ""
  }

  public async execute(firstName: string, surname: string, email: string, password: string, confirmPassword: string): Promise<void> {
    if(!firstName || !surname || !email || !password || !confirmPassword) {
      const error: IAppError = {
        statusCode: 400,
        message: "Preencha todos os campos!"
      };

      throw error;
    };

    if(password !== confirmPassword) {
      const error: IAppError = {
        statusCode: 400,
        message: "As senhas não coincidem!"
      };

      throw error;
    };

    const userExists = await this.userRepository.findByEmail(email);

    if(userExists) {
      const error: IAppError = {
        statusCode: 400,
        message: "O email já está sendo utilizado!"
      };

      throw error;
    };

    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    await this.userRepository.create(firstName, surname, email, passwordHash);

    return;
  }

}
