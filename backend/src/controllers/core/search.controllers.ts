import { Request, Response } from "express";
import { SearchServices } from "../../services/core/search.services";

export class SearchController {
  static async searchPosts(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchServices.searchPosts(q as string);

    return res.json(result);
  }

  static async searchUsers(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchServices.searchUsers(q as string);

    return res.json(result);
  }

  static async searchMedia(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchServices.searchMedia(q as string);

    return res.json(result);
  }

  static async searchPopularPosts(req: Request, res: Response) {
    const { q } = req.query;
    const result = await SearchServices.searchPopularPosts(q as string);

    return res.json(result);
  }
}
