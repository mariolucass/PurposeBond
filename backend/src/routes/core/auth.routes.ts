import { Router } from "express";

import { AuthController } from "../../controllers/core/auth.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { GlobalMiddlewares } from "../../middlewares/core/global.middlewares";
import { loginSchema, registerSchema } from "../../schemas/auth.schemas";

export const authRouter = Router();

authRouter.post(
  "/register",
  AuthMiddlewares.preventDuplicateEmail,
  AuthMiddlewares.preventDuplicateUsername,
  GlobalMiddlewares.validateSchema(registerSchema),
  AuthController.register
);

authRouter.post(
  "/login",
  GlobalMiddlewares.validateSchema(loginSchema),
  AuthController.login
);
