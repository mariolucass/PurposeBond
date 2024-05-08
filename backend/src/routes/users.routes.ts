import { Router } from "express";

export const usersRouter = Router();

usersRouter.get("/");

usersRouter.get("/:id");

usersRouter.patch("/:id");

usersRouter.delete("/:id");
