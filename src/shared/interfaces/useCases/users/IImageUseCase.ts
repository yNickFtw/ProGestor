export interface IImageUseCase {
  execute: (firebaseUrl: string, filename: string, userId: number) => Promise<void>;
}