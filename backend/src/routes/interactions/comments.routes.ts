import { Router } from "express";
import { CommentsController } from "../../controllers/interactions/comments.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { CommentsMiddlewares } from "../../middlewares/interactions/comments.middlewares";

export const commentsRouter = Router();

commentsRouter.use("/:id", [
  AuthMiddlewares.validateToken,
  CommentsMiddlewares.verifyCommentExistence,
]);

commentsRouter.get("/:id", CommentsController.retrieveComment);

commentsRouter.patch("/:id", CommentsController.patchComment);

commentsRouter.delete("/:id", CommentsController.deleteComment);
