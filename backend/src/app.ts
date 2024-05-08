import express, { json } from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { ErrorHandler } from "./errors/errorHandler";
import { authRouter } from "./routes/auth.routes";
import { commentsRouter } from "./routes/comments.routes";
import { likesRouter } from "./routes/likes.routes";
import { postsRouter } from "./routes/posts.routes";
import { usersRouter } from "./routes/users.routes";

export const app = express();

app.use(helmet());

app.use(json());

app.use("/", authRouter);
app.use("/comments/", commentsRouter);
app.use("/likes/", likesRouter);
app.use("/posts/", postsRouter);
app.use("/users/", usersRouter);

app.use(ErrorHandler.execute);
