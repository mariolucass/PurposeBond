import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { corsOptions } from "./config/cors";
import { ErrorHandler } from "./errors/errorHandler";
import {
  authRouter,
  commentsRouter,
  followRouter,
  insightRouter,
  likesRouter,
  messagesRouter,
  notificationsRouter,
  postsRouter,
  profileRouter,
  repostsRouter,
  searchRouter,
  usersRouter,
} from "./routes";

const app = express();

app.use(cors(corsOptions));
app.use(json());
app.use(helmet());

app.use("/auth", authRouter);
app.use("/search", searchRouter);
app.use("/profile", profileRouter);
app.use("/user", followRouter);
app.use("/users", usersRouter);

app.use("/comments", commentsRouter);
app.use("/likes", likesRouter);
app.use("/reposts", repostsRouter);

app.use("/posts", postsRouter);

app.use("/messages", messagesRouter);

app.use("/notifications", notificationsRouter);

app.use("/insights", insightRouter);

app.use(ErrorHandler.execute);

export { app };
