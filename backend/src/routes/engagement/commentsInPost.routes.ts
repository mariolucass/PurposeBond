import { CommentController } from "@/controllers";
import { AuthMiddleware } from "@/middlewares";
import { Router } from "express";

export const commentsInPostRouter = Router();

commentsInPostRouter.use(AuthMiddleware.validateToken);

commentsInPostRouter.get("/", CommentController.getComments);

commentsInPostRouter.post("/", CommentController.postComment);
