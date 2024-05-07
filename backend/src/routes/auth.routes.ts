import { Router } from "express";

export const authRouter = Router();

authRouter.post("/");

authRouter.get("/");

authRouter.get("/:id");

authRouter.patch("/:id");

authRouter.delete("/:id");
