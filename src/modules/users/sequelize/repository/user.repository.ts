import { IUserRepository } from "../../../../shared/interfaces/repositories/IUserRepository";
import { IUser } from "../../../../shared/interfaces/schemas/IUser";
import { User } from "../entities/user.schema";

export default class UserRepository implements IUserRepository {
  public async create(firstName: string, surname: string, email: string, password: string): Promise<void> {
    await User.create({...{ firstName, surname, email, password }})

    return
  }

  public async findByEmail(email: string): Promise<IUser | undefined> {
    const user = await User.findOne({ where: { email: email } });

    return user as unknown as IUser;
  }

  public async findById(id: number): Promise<IUser | null> {
    const user = await User.findOne({ where: { id: id } })

    return user as unknown as IUser;
  }

  public async changeProfileImage(profileImage: string, profileImageFilename: string, userId: number): Promise<void> {
    await User.update({ ... { profileImage, profileImageFilename } }, { where: { id: userId } })
  
    return
  }

}
