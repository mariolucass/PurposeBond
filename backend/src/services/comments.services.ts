import { Comment } from "@prisma/client";
import { commentModel } from "../database/models";
import { commentReturnSchema } from "../schemas/comments.schemas";

export class CommentsServices {
  static getComments = async (postId: string) => {
    const comments = await commentModel.findMany({ where: { postId } });

    return commentReturnSchema.parse(comments);
  };

  static postComment = async (postId: string, body: Comment) => {
    const comment = await commentModel.create({ data: body });

    return commentReturnSchema.parse(comment);
  };

  static retrieveComment = async (id: string) => {
    const comment = await commentModel.findFirst({ where: { id: id } });

    return commentReturnSchema.parse(comment);
  };

  static patchComment = async (id: string, body: {}) => {
    const comment = await commentModel.update({
      where: { id: id },
      data: body,
    });

    return commentReturnSchema.parse(comment);
  };

  static deleteComment = async (id: string) => {
    await commentModel.delete({ where: { id: id } });
  };
}
