import { InsightService } from "@/services/analytics/insights.service";
import { Request, Response } from "express";

export class InsightController {
  static getTotalUsers = async (_: Request, res: Response) => {
    const data = await InsightService.getTotalUsers();
    return res.json({ totalUsers: data });
  };

  static getTotalPosts = async (_: Request, res: Response) => {
    const data = await InsightService.getTotalPosts();
    return res.json({ totalPosts: data });
  };

  static getTotalLikes = async (_: Request, res: Response) => {
    const data = await InsightService.getTotalLikes();
    return res.json({ totalLikes: data });
  };

  static getTotalComments = async (_: Request, res: Response) => {
    const data = await InsightService.getTotalComments();
    return res.json({ totalComments: data });
  };

  static getTotalReposts = async (_: Request, res: Response) => {
    const data = await InsightService.getTotalReposts();
    return res.json({ totalReposts: data });
  };

  static getTopPostsByLikes = async (_: Request, res: Response) => {
    const data = await InsightService.getTopPostsByLikes();
    return res.json(data);
  };

  static getTopPostsByComments = async (_: Request, res: Response) => {
    const data = await InsightService.getTopPostsByComments();
    return res.json(data);
  };

  static getTopCommunities = async (_: Request, res: Response) => {
    const data = await InsightService.getTopCommunities();
    return res.json(data);
  };
}
