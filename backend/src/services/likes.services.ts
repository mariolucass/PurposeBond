import { likeModel } from "../database/models";

export class LikesServices {
  static postLike = async (postId: string, userId: string) => {
    await likeModel.create({
      data: { userId: userId, postId: postId },
    });
  };

  static deleteLike = async (id: string) => {
    await likeModel.delete({ where: { id: id } });
  };
}
