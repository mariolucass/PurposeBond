import { Request, Response } from "express";
import { CommentsServices } from "../services/comments.services";

export class CommentsController {
  static getComments = async (_: Request, res: Response) => {
    const postId = res.locals.post.id;
    const comments = await CommentsServices.getComments(postId);

    return res.json(comments);
  };

  static postComment = async (req: Request, res: Response) => {
    const {
      post: { id: postId },
      user: { id: userId },
    } = res.locals;

    req.body = {
      ...req.body,
      postId,
      authorId: userId,
    };

    const comment = await CommentsServices.postComment(req.body);

    return res.status(201).json(comment);
  };

  static retrieveComment = async (_: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    const comment = await CommentsServices.retrieveComment(commentId);

    return res.json(comment);
  };

  static patchComment = async (req: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    const comment = await CommentsServices.patchComment(commentId, req.body);

    return res.json(comment);
  };

  static deleteComment = async (_: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    await CommentsServices.deleteComment(commentId);

    return res.status(204);
  };
}
