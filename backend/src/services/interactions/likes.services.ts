import { likeModel } from "../../database/models";
import { postRefSelect, postSelect } from "../../utils/posts.selects";

export class LikesServices {
  static getLikesUser = async (userId: string) => {
    const likes = await likeModel.findMany({
      where: { authorId: userId },
      select: { id: true, post: { select: postSelect } },
      orderBy: { createdAt: "desc" },
    });

    return likes.map((like) => like.post);
  };

  static postLike = async (userId: string, postId: string) => {
    const like = await likeModel.create({
      data: {
        post: { connect: { id: postId } },
        author: { connect: { id: userId } },
      },
      select: { id: true, post: { select: postRefSelect } },
    });

    return like;
  };

  static deleteLike = async (likeId: string) => {
    await likeModel.delete({ where: { id: likeId } });
  };
}
