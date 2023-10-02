import jwt, { JwtPayload } from 'jsonwebtoken'
require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET || ""

export function getUserIdFromToken(token: string): number | null {
  try {
    if (typeof token !== 'string') {
      throw new Error('Token is not a string');
    }

    const tokenParts = token.split('Bearer ');

    if (tokenParts.length !== 2) {
      throw new Error('Invalid token format');
    }

    const decoded = jwt.verify(tokenParts[1], JWT_SECRET) as JwtPayload;
    return decoded?.userId || null;
  } catch (error: any) {
    return null;
  }
}