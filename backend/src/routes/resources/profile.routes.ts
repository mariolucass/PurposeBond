import { Router } from "express";
import { ProfileController } from "../../controllers/resources/profile.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";

export const profileRouter = Router();

profileRouter.use(AuthMiddlewares.validateToken);

profileRouter.get("", ProfileController.getProfile);

profileRouter.get("/discussions", ProfileController.getDiscussions);

profileRouter.get("/posts", ProfileController.getPosts);

profileRouter.get("/likes", ProfileController.getLikedPosts);

profileRouter.get("/reposts", ProfileController.getRepostedPosts);

profileRouter.get("/media", ProfileController.getMedia);

profileRouter.get("/messages", ProfileController.getMessages);

profileRouter.get("/followers", ProfileController.getFollowers);

profileRouter.get("/following", ProfileController.getFollowing);

profileRouter.get("/count", ProfileController.getCountStats);
