import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { ZodError } from "zod";
import { AppError } from "./appError";

export class ErrorHandler {
  static execute(err: Error, _: Request, res: Response, __: NextFunction) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ error: err.message });
    }

    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ error: "Token inválido." });
    }

    if (err instanceof ZodError) {
      return res.status(400).json(err);
    }

    console.log(err);
    return res.status(500).json({ error: "Internal server error." });
  }
}
