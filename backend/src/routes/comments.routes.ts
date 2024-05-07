import { Router } from "express";

export const commentsRouter = Router();

commentsRouter.post("/");

commentsRouter.get("/");

commentsRouter.get("/:id");

commentsRouter.patch("/:id");

commentsRouter.delete("/:id");
