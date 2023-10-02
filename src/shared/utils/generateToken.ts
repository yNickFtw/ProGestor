require('dotenv').config()
import jwt from 'jsonwebtoken'
import { IResponseJWT } from "../interfaces/responses/IResponseJWT";
const JWT_SECRET = process.env.JWT_SECRET as string

export async function generateToken(temp: string, userId: number): Promise<IResponseJWT> {
  const token = jwt.sign({ userId }, JWT_SECRET, {
    expiresIn: temp
  });

  return { token, userId } as IResponseJWT
}