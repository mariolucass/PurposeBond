import { likeModel } from "../database/models";

export class LikesServices {
  static getLikesUser = async (userId: string) => {
    const likes = await likeModel.findMany({
      where: { userId: userId },
    });
    return likes;
  };

  static postLike = async (postId: string, userId: string) => {
    await likeModel.create({
      data: { userId: userId, postId: postId },
    });
  };

  static deleteLike = async (id: string) => {
    await likeModel.delete({ where: { id: id } });
  };
}
