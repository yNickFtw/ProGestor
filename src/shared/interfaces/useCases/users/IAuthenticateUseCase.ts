import { IAppError } from "../errors/IAppError";
import { IResponseJWT } from "../responses/IResponseJWT";

export interface IAuthenticateUseCase {
  execute: (email: string, password: string) => Promise<IResponseJWT | IAppError>
}