import { repostModel } from "../../database/models";

export class RepostsServices {
  static getRepostsUser = async (userId: string) => {
    const reposts = await repostModel.findMany({
      where: { authorId: userId },
      include: { post: true },
    });

    return reposts;
  };

  static postRepost = async (userId: string, postId: string) => {
    const repost = await repostModel.create({
      data: {
        post: { connect: { id: postId } },
        author: { connect: { id: userId } },
      },
      include: { post: true },
    });

    return repost;
  };

  static deleteRepost = async (repostId: string) => {
    await repostModel.delete({ where: { id: repostId } });
  };
}
