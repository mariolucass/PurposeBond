import { likeModel } from "../database/models";
import { likeReturnSchema } from "../schemas/likes.schemas";

export class LikesServices {
  static getLikes = async () => {
    const likes = await likeModel.findMany();

    return likeReturnSchema.parse(likes);
  };

  static postLike = async (postId: string, userId: string) => {
    const like = await likeModel.create({
      data: { userId: userId, postId: postId },
    });

    return likeReturnSchema.parse(like);
  };

  static retrieveLike = async (id: string) => {
    const like = await likeModel.findFirst({ where: { id: id } });

    return likeReturnSchema.parse(like);
  };

  static patchLike = async (id: string, body: {}) => {
    const like = await likeModel.update({ where: { id: id }, data: body });

    return likeReturnSchema.parse(like);
  };

  static deleteLike = async (id: string) => {
    await likeModel.delete({ where: { id: id } });
  };
}
