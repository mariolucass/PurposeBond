import { Request, Response, Router } from "express";
import { SearchController } from "../../controllers/core/search.controllers";

export const searchRouter = Router();

function handleSearch(req: Request, res: Response) {
  const { q, type } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Missing search query." });
  }

  switch (type) {
    case "popular":
      return SearchController.searchPopularPosts(req, res);
    case "latest":
      return SearchController.searchPosts(req, res);
    case "users":
      return SearchController.searchUsers(req, res);
    case "media":
      return SearchController.searchMedia(req, res);

    default:
      return res.status(400).json({ error: "Invalid search type." });
  }
}

searchRouter.get("/", handleSearch);
