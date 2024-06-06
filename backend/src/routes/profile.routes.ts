import { Router } from "express";
import { ProfileController } from "../controllers/profile.controllers";
import { AuthMiddlewares } from "./../middlewares/auth.middlewares";

export const profileRouter = Router();

profileRouter.use(AuthMiddlewares.validateToken);

profileRouter.get("", ProfileController.getProfile);

profileRouter.get("/discussions", ProfileController.getDiscussions);

profileRouter.get("/posts", ProfileController.getPosts);

profileRouter.get("/likes", ProfileController.getLikes);

profileRouter.get("/media", ProfileController.getMedia);

profileRouter.get("/messages", ProfileController.getMessages);
