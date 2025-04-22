import { AuthController } from "@/controllers";
import { AuthMiddleware, GlobalMiddleware } from "@/middlewares";
import { loginSchema, registerSchema } from "@/schemas";
import { Router } from "express";

export const authRouter = Router();

authRouter.post(
  "/register",
  AuthMiddleware.preventDuplicateEmail,
  AuthMiddleware.preventDuplicateUsername,
  GlobalMiddleware.validateSchema(registerSchema),
  AuthController.register
);

authRouter.post(
  "/login",
  GlobalMiddleware.validateSchema(loginSchema),
  AuthController.login
);
