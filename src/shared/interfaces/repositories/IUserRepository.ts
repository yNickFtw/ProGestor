import { IUser } from "../schemas/IUser";

export interface IUserRepository {
  create: (
    firstName: string,
    surname: string,
    email: string,
    password: string
  ) => Promise<void>;
  findByEmail: (email: string) => Promise<IUser | undefined>;
  findById: (id: number) => Promise<IUser | null>;
  changeProfileImage: (profileImage: string, profileImageFilename: string, userId: number) => Promise<void>
}
