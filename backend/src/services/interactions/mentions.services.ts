import { mentionModel } from "../../database/models";

export class MentionsServices {
  static postMention = async (userId: string, postId: string) => {
    const newMention = await mentionModel.create({
      data: {
        user: { connect: { id: userId } },
        post: { connect: { id: postId } },
      },
      include: { user: true, post: true },
    });

    return newMention;
  };

  static getMentionsForUser = async (userId: string) => {
    const mentions = await mentionModel.findMany({
      where: { userId },
      include: { post: true },
    });
    return mentions;
  };

  static getMentionsInPost = async (postId: string) => {
    const mentions = await mentionModel.findMany({
      where: { postId },
      include: { user: true },
    });
    return mentions;
  };
}
