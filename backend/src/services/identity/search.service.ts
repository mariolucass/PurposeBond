import { postModel, userModel } from "@/database/models";
import { postReturnSchema } from "@/schemas";
import { postSelect } from "@/utils/selects/content/posts.selects";
import { userSelect } from "@/utils/selects/content/users.selects";

export class SearchService {
  static searchPosts = async (query: string) => {
    const posts = await postModel.findMany({
      where: { content: { contains: query, mode: "insensitive" } },
      select: postSelect,
    });

    return postReturnSchema.array().parse(posts);
  };

  static async searchUsers(query: string) {
    const users = await userModel.findMany({
      where: { username: { contains: query, mode: "insensitive" } },
      select: userSelect,
    });

    return users;
  }

  static async searchMedia(query: string) {
    const posts = await postModel.findMany({
      where: { content: { contains: query, mode: "insensitive" } },
      select: postSelect,
    });

    return postReturnSchema.array().parse(posts);
  }

  static async searchPopularPosts(query: string) {
    const posts = await postModel.findMany({
      where: { content: { contains: query, mode: "insensitive" } },
      select: postSelect,
    });

    return postReturnSchema.array().parse(posts);
  }
}
