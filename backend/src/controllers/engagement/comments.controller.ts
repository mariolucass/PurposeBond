import { CommentService, NotificationService } from "@/services";
import { Request, Response } from "express";

export class CommentController {
  static getComments = async (_: Request, res: Response) => {
    const postId = res.locals.post.id;
    const comments = await CommentService.getComments(postId);

    return res.json(comments);
  };

  static postComment = async (req: Request, res: Response) => {
    const {
      user: { id: userId },
      post: {
        id: postId,
        author: { id: authorId },
      },
    } = res.locals;

    req.body = {
      ...req.body,
      postId,
      authorId: userId,
    };

    const comment = await CommentService.postComment(req.body);

    await NotificationService.postNotificationPostCommented({
      authorId: userId,
      userId: authorId,
      postId,
      commentId: comment.id,
    });

    return res.status(201).json(comment);
  };

  static retrieveComment = async (_: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    const comment = await CommentService.retrieveComment(commentId);

    return res.json(comment);
  };

  static patchComment = async (req: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    const comment = await CommentService.patchComment(commentId, req.body);

    return res.json(comment);
  };

  static deleteComment = async (_: Request, res: Response) => {
    const commentId = res.locals.comment.id;
    await CommentService.deleteComment(commentId);

    return res.status(204);
  };
}
