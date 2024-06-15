import { commentModel } from "../../database/models";
import { CommentCreateInterface } from "../../interfaces/comments.interfaces";
import { commentReturnSchema } from "../../schemas/comments.schemas";
import { commentSelect } from "../../utils/prismaHelpers";

export class CommentsServices {
  static getComments = async (postId: string) => {
    const comments = await commentModel.findMany({
      where: { postId },
      select: commentSelect,
      orderBy: { createdAt: "desc" },
    });

    return commentReturnSchema.array().parse(comments);
  };

  static postComment = async (body: CommentCreateInterface) => {
    const comment = await commentModel.create({
      data: body,
      select: commentSelect,
    });

    return commentReturnSchema.parse(comment);
  };

  static retrieveComment = async (id: string) => {
    const comment = await commentModel.findFirst({
      where: { id: id },
      include: { author: true },
    });

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
