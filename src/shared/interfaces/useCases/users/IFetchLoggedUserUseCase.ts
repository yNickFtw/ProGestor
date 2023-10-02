import { IUser } from "../../schemas/IUser";

export interface IFetchLoggedUserUseCase {
  execute: (userId: number) => Promise<IUser | null>;
}