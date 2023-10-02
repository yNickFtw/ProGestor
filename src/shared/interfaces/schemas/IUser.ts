export interface IUser {
  id?: number;
  firstName: string;
  surname: string;
  profileImage: string;
  profileImageFilename: string;
  email: string;
  password: string;
  isPremium: boolean;
}