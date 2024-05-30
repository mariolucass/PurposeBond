import { repostModel } from "../database/models";
import { NotificationsService } from "./notifications.services";

export class RepostsService {
  static postRepost = async (userId: string, postId: string) => {
    const newRepost = await repostModel.create({
      data: {
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },

      include: { post: true },
    });

    const notification = await NotificationsService.postNotification({
      user: { connect: { id: newRepost.post.authorId } },
      type: "POST_REPOSTED",
      repostId: newRepost.id,
    });

    return {
      repost: newRepost,
      notification: notification,
    };
  };

  static getRepostsForUser = async (userId: string) => {
    const reposts = await repostModel.findMany({
      where: { authorId: userId },
      include: { post: true },
    });
    return reposts;
  };

  static getRepostsForPost = async (postId: string) => {
    const reposts = await repostModel.findMany({
      where: { postId },
      include: { author: true },
    });
    return reposts;
  };

  static deleteRepost = async (repostId: string) => {
    await repostModel.delete({ where: { id: repostId } });
  };
}
