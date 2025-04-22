import { SearchService } from "@/services";
import { Request, Response } from "express";

export class SearchController {
  static async searchPosts(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchService.searchPosts(q as string);

    return res.json(result);
  }

  static async searchUsers(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchService.searchUsers(q as string);

    return res.json(result);
  }

  static async searchMedia(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchService.searchMedia(q as string);

    return res.json(result);
  }

  static async searchPopularPosts(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchService.searchPopularPosts(q as string);

    return res.json(result);
  }
}
