import {
  communityMemberModel,
  communityModel,
  postModel,
} from "@/database/models";
import { userRefSchema } from "@/schemas";
import { userRefSelect } from "@/utils/selects/content/users.selects";

export class CommunityService {
  static async getAllCommunities(query?: string) {
    if (query) {
      return communityModel.findMany({
        where: { name: { contains: query, mode: "insensitive" } },
        orderBy: { createdAt: "desc" },
        take: 20,
      });
    }
    return communityModel.findMany({
      orderBy: { createdAt: "desc" },
      take: 20,
    });
  }

  static async getCommunityById(communityId: string) {
    return communityModel.findUnique({ where: { id: communityId } });
  }

  static async getCommunitiesByUser(userId: string) {
    const memberships = await communityMemberModel.findMany({
      where: { userId },
      select: { community: true },
    });

    return memberships.map((m) => m.community);
  }

  static async getMembersOfCommunity(communityId: string) {
    const members = await communityMemberModel.findMany({
      where: { communityId },
      select: {
        user: { select: userRefSelect },
      },
    });

    const users = members.map((m: any) => m.user);
    return userRefSchema.array().parse(users);
  }

  static async joinCommunity(userId: string, communityId: string) {
    await communityMemberModel.create({
      data: { userId, communityId },
    });
  }

  static async leaveCommunity(userId: string, communityId: string) {
    await communityMemberModel.delete({
      where: {
        userId_communityId: { userId, communityId },
      },
    });
  }

  static async createCommunity(
    ownerId: string,
    name: string,
    description: string,
    image?: string
  ) {
    return communityModel.create({
      data: {
        name,
        description,
        image: image ?? null,
        ownerId,
      },
    });
  }

  static async getCommunityFeed(communityId: string) {
    return postModel.findMany({
      where: { communityId },
      orderBy: { createdAt: "desc" },
    });
  }
}
