import { likeModel } from "../database/models";
import { likeReturnSchema } from "../schemas/likes.schemas";

export class LikesServices {
  static postLike = async (postId: string, userId: string) => {
    const like = await likeModel.create({
      data: { userId: userId, postId: postId },
    });

    return likeReturnSchema.parse(like);
  };

  static deleteLike = async (id: string) => {
    await likeModel.delete({ where: { id: id } });
  };
}
