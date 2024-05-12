import { Router } from "express";
import { PostsController } from "../controllers/posts.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { PostsMiddlewares } from "../middlewares/posts.middlewares";

export const postsRouter = Router();

postsRouter.use(AuthMiddlewares.validateToken);

postsRouter.post("/", PostsController.postPost);

postsRouter.get("/", PostsController.getPosts);

postsRouter.use("/:id", PostsMiddlewares.verifyPostExistence);

postsRouter.get("/:id", PostsController.retrievePost);

postsRouter.patch(
  "/:id",
  PostsMiddlewares.confirmPostOwnership,
  PostsController.patchPost
);

postsRouter.delete(
  "/:id",
  PostsMiddlewares.confirmPostOwnership,
  PostsController.deletePost
);
