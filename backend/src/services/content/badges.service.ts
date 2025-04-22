import { badgeModel, userBadgeModel } from "@/database/models";
import { userRefSchema } from "@/schemas";
import { userRefSelect } from "@/utils/selects/content/users.selects";

export class BadgeService {
  static async getAllBadges() {
    return badgeModel.findMany();
  }

  static async getBadgesByUser(userId: string) {
    const userBadges = await userBadgeModel.findMany({
      where: { userId },
      select: { badge: true },
    });

    return userBadges.map((ub) => ub.badge);
  }

  static async getUsersWithBadge(badgeId: string) {
    const users = await userBadgeModel.findMany({
      where: { badgeId },
      select: {
        user: { select: userRefSelect },
      },
    });

    const parsedUsers = users.map((u: any) => u.user);
    return userRefSchema.array().parse(parsedUsers);
  }

  static async removeBadgeFromUser(userId: string, badgeId: string) {
    await userBadgeModel.delete({
      where: {
        userId_badgeId: { userId, badgeId },
      },
    });
  }
}
