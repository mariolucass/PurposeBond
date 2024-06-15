import { Router } from "express";
import { CommentsController } from "../../controllers/interactions/comments.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";
import { CommentsMiddlewares } from "../../middlewares/interactions/comments.middlewares";

export const commentsRouter = Router();

commentsRouter.use(AuthMiddlewares.validateToken);

commentsRouter.get("/", CommentsController.getComments);

commentsRouter.post("/", CommentsController.postComment);

commentsRouter.use("/:id", CommentsMiddlewares.verifyCommentExistence);

commentsRouter.get("/:id", CommentsController.retrieveComment);

commentsRouter.patch("/:id", CommentsController.patchComment);

commentsRouter.delete("/:id", CommentsController.deleteComment);
