import { Router } from "express";

export const postsRouter = Router();

postsRouter.post("/");

postsRouter.get("/");

postsRouter.get("/:id");

postsRouter.patch("/:id");

postsRouter.delete("/:id");
