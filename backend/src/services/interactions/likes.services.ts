import { likeModel } from "../../database/models";

export class LikesServices {
  static getLikesUser = async (userId: string) => {
    const likes = await likeModel.findMany({
      where: { authorId: userId },
    });

    return likes;
  };

  static postLike = async (postId: string, userId: string) => {
    const like = await likeModel.create({
      data: {
        post: { connect: { id: postId } },
        author: { connect: { id: userId } },
      },
    });

    return like;
  };

  static deleteLike = async (likeId: string) => {
    await likeModel.delete({ where: { id: likeId } });

    return;
  };
}
