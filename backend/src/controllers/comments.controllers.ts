import { Request, Response } from "express";
import { CommentsServices } from "../services/comments.services";

export class CommentsController {
  static getComments = async (req: Request, res: Response) => {
    const postId = res.locals.foundPost.id;
    const comments = await CommentsServices.getComments(postId);

    return res.json(comments);
  };

  static postComment = async (req: Request, res: Response) => {
    const postId = res.locals.foundPost.id;
    const comment = await CommentsServices.postComment(postId, req.body);

    return res.status(201).json(comment);
  };
  static retrieveComment = async (req: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    2;
    const comment = await CommentsServices.retrieveComment(commentId);

    return res.json(comment);
  };
  static patchComment = async (req: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    const comment = await CommentsServices.patchComment(commentId, req.body);

    return res.json(comment);
  };
  static deleteComment = async (req: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    await CommentsServices.deleteComment(commentId);

    return res.status(204);
  };
}
