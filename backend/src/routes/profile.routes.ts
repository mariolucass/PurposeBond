import { Router } from "express";
import { ProfileController } from "../controllers/profile.controllers";
import { AuthMiddlewares } from "./../middlewares/auth.middlewares";

export const profileRouter = Router();

profileRouter.use(AuthMiddlewares.validateToken);

profileRouter.get("", ProfileController.getProfile);
