import { CommentController } from "@/controllers";
import { AuthMiddleware, CommentsMiddleware } from "@/middlewares";
import { Router } from "express";

export const commentsRouter = Router();

commentsRouter.use("/:id", [
  AuthMiddleware.validateToken,
  CommentsMiddleware.verifyCommentExistence,
]);

commentsRouter.get("/:id", CommentController.retrieveComment);

commentsRouter.patch("/:id", CommentController.patchComment);

commentsRouter.delete("/:id", CommentController.deleteComment);
