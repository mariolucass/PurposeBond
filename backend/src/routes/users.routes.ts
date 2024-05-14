import { Router } from "express";
import { UsersController } from "../controllers/users.controllers";
import { AuthMiddlewares } from "../middlewares/auth.middlewares";
import { UsersMiddlewares } from "../middlewares/users.middlewares";

export const usersRouter = Router();

usersRouter.get("/", UsersController.getUsers);

usersRouter.use("/:id", UsersMiddlewares.verifyUserExistence);

usersRouter.get("/:id", UsersController.retrieveUser);

usersRouter.use("/:id", [
  AuthMiddlewares.validateToken,
  UsersMiddlewares.confirmUserIdentity,
]);

usersRouter.patch("/:id", UsersController.patchUser);

usersRouter.delete("/:id", UsersController.deleteUser);
