import { Router } from "express";
import { PostsController } from "../../controllers/resources/posts.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { PostsMiddlewares } from "../../middlewares/resources/posts.middlewares";
import { commentsInPostRouter } from "../interactions/commentsInPost.routes";

export const postsRouter = Router();

postsRouter.get("/", PostsController.getPosts);

postsRouter.get(
  "/dashboard",
  AuthMiddlewares.validateToken,
  PostsController.getDashboardPosts
);

postsRouter.post("/", AuthMiddlewares.validateToken, PostsController.postPost);

postsRouter.use("/:id", PostsMiddlewares.verifyPostExistence);

postsRouter.get("/:id", PostsController.retrievePost);

postsRouter.patch(
  "/:id",

  AuthMiddlewares.validateToken,
  PostsMiddlewares.confirmPostOwnership,
  PostsController.patchPost
);

postsRouter.delete(
  "/:id",
  AuthMiddlewares.validateToken,
  PostsMiddlewares.confirmPostOwnership,
  PostsController.deletePost
);

postsRouter.use("/:id/comments/", commentsInPostRouter);
