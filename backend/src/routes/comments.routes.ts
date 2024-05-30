import { Router } from "express";
import { CommentsController } from "../controllers/comments.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { CommentsMiddlewares } from "../middlewares/comments.middlewares";

export const commentsRouter = Router();

commentsRouter.use(AuthMiddlewares.validateToken);

commentsRouter.get("/", CommentsController.getComments);

commentsRouter.post("/", CommentsController.postComment);

commentsRouter.use("/:id", CommentsMiddlewares.verifyCommentExistence);

commentsRouter.get("/:id", CommentsController.retrieveComment);

commentsRouter.patch("/:id", CommentsController.patchComment);

commentsRouter.delete("/:id", CommentsController.deleteComment);
