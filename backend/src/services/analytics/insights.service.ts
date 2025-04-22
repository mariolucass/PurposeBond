import {
  commentModel,
  communityModel,
  followModel,
  likeModel,
  postModel,
  repostModel,
  userModel,
} from "@/database/models";

export class InsightService {
  static async getTotalUsers() {
    return userModel.count();
  }

  static async getTotalPosts() {
    return postModel.count();
  }

  static async getTotalLikes() {
    return likeModel.count();
  }

  static async getTotalComments() {
    return commentModel.count();
  }

  static async getTotalReposts() {
    return repostModel.count();
  }

  static async getFollowersCountByUser(userId: string) {
    return followModel.count({ where: { followingId: userId } });
  }

  static async getTopPostsByLikes(limit = 5) {
    return postModel.findMany({
      orderBy: {
        likes: { _count: "desc" },
      },
      include: {
        _count: { select: { likes: true } },
      },
      take: limit,
    });
  }

  static async getTopPostsByComments(limit = 5) {
    return postModel.findMany({
      orderBy: {
        comments: { _count: "desc" },
      },
      include: {
        _count: { select: { comments: true } },
      },
      take: limit,
    });
  }

  static async getTopCommunities(limit = 5) {
    return communityModel.findMany({
      orderBy: {
        members: { _count: "desc" },
      },
      include: {
        _count: { select: { members: true } },
      },
      take: limit,
    });
  }
}
