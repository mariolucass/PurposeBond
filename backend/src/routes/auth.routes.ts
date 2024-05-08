import { Router } from "express";
import { AuthController } from "../controllers/auth.controllers";
import { GlobalMiddlewares } from "../middlewares/global.middleware";
import { loginSchema, registerSchema } from "../schemas/auth.schemas";
import { AuthMiddlewares } from "./../middlewares/auth.middlewares";

export const authRouter = Router();

authRouter.post(
  "/register",
  AuthMiddlewares.preventDuplicateEmail,
  AuthMiddlewares.preventDuplicateUsername,
  GlobalMiddlewares.validateSchema(registerSchema),
  AuthController.register
);

authRouter.get(
  "/login",
  GlobalMiddlewares.validateSchema(loginSchema),
  AuthController.login
);
