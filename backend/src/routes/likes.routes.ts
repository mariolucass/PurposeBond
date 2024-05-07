import { Router } from "express";

export const likesRouter = Router();

likesRouter.post("/");

likesRouter.get("/");

likesRouter.get("/:id");

likesRouter.patch("/:id");

likesRouter.delete("/:id");
