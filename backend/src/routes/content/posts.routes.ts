import { PostController } from "@/controllers";
import { AuthMiddleware, PostsMiddleware } from "@/middlewares";
import { Router } from "express";
import { commentsInPostRouter } from "../engagement/commentsInPost.routes";

export const postsRouter = Router();

postsRouter.get("/", PostController.getPosts);

postsRouter.get(
  "/dashboard",
  AuthMiddleware.validateToken,
  PostController.getDashboardPosts
);

postsRouter.post("/", AuthMiddleware.validateToken, PostController.postPost);

postsRouter.use("/:id", PostsMiddleware.verifyPostExistence);

postsRouter.get("/:id", PostController.retrievePost);

postsRouter.patch(
  "/:id",
  AuthMiddleware.validateToken,
  PostsMiddleware.confirmPostOwnership,
  PostController.patchPost
);

postsRouter.delete(
  "/:id",
  AuthMiddleware.validateToken,
  PostsMiddleware.confirmPostOwnership,
  PostController.deletePost
);

postsRouter.use("/:id/comments/", commentsInPostRouter);
