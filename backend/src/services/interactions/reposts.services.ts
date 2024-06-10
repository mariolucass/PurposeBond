import { repostModel } from "../../database/models";
import { NotificationsServices } from "../utilities/notifications.services";

export class RepostsServices {
  static postRepost = async (userId: string, postId: string) => {
    const newRepost = await repostModel.create({
      data: {
        author: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
      include: { post: true },
    });

    const notification =
      await NotificationsServices.postNotificationPostReposted({
        userId: newRepost.post.authorId,
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
