import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "";

export function checkIfIsAuthenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(401).json({ message: "Token não encontrado" });
    }

    const tokenSplited = token.split("Bearer ");

    const decoded = jwt.verify(tokenSplited[1], JWT_SECRET);

    if (!decoded) {
      return res
        .status(401)
        .json({ message: "Token inválido, faça login novamente" });
    }

    next();
  } catch (error: any) {
    return res
      .status(401)
      .json({ message: "Ocorreu um erro, faça login novamente.", error });
  }
}