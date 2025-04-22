import { app } from "@/app";
import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export class GlobalMiddleware {
  static validateSchema =
    (schema: ZodTypeAny) => (req: Request, _: Response, next: NextFunction) => {
      const bodyValidated = schema.parse(req.body);
      req.body = bodyValidated;
      return next();
    };

  static injectSocketIO = (req: Request, res: Response, next: NextFunction) => {
    res.locals.io = app.get("io");
    return next();
  };
}
