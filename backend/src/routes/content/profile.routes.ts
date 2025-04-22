import { ProfileController } from "@/controllers";
import { AuthMiddleware } from "@/middlewares";
import { Router } from "express";

export const profileRouter = Router();

profileRouter.use(AuthMiddleware.validateToken);

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
