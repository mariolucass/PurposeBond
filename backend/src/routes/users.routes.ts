import { Router } from "express";

export const usersRouter = Router();

usersRouter.post("/");

usersRouter.get("/");

usersRouter.get("/:id");

usersRouter.patch("/:id");

usersRouter.delete("/:id");
