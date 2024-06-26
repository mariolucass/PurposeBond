import { Router } from "express";
import { CommentsController } from "../../controllers/interactions/comments.controllers";
import { AuthMiddlewares } from "../../middlewares/core/auth.middlewares";

export const commentsInPostRouter = Router();

commentsInPostRouter.use(AuthMiddlewares.validateToken);

commentsInPostRouter.get("/", CommentsController.getComments);

commentsInPostRouter.post("/", CommentsController.postComment);
