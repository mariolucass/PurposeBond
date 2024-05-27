import { likeModel } from "../database/models";

export class LikesServices {
  static getLikesUser = async (userId: string) => {
    const likes = await likeModel.findMany({
      where: { userId: userId },
    });

    return likes;
  };

  static postLike = async (postId: string, userId: string) => {
    const like = await likeModel.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });

    return like;
  };

  static deleteLike = async (likeId: string) => {
    await likeModel.delete({ where: { id: likeId } });

    return;
  };
}
