import { postViewModel } from "../database/models";

export class PostsViewsServices {
  static postPostView = async (postId: string) => {
    const postViews = await postViewModel.findMany({
      where: { postId },
      include: { user: true },
    });

    return postViews;
  };

  static getPostViews = async (postId: string) => {
    const postViews = await postViewModel.findMany({
      where: { postId },
      include: { user: true },
    });

    return postViews;
  };
}
