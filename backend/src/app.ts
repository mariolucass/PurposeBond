import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import helmet from "helmet";
import "reflect-metadata";
import { ErrorHandler } from "./errors/errorHandler";
import {
  authRouter,
  commentsRouter,
  followRouter,
  likesRouter,
  messagesRouter,
  postsRouter,
  profileRouter,
  searchRouter,
  usersRouter,
} from "./routes";
import { repostsRouter } from "./routes/interactions/reposts.routes";

export const app = express();

const corsOptions = {
  origin: process.env.CORS_ORIGIN || "*",
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(json());
app.use(helmet());

app.use("", authRouter);

app.use("/profile", profileRouter);
app.use("/user", followRouter);
app.use("/users", usersRouter);

app.use("/search", searchRouter);

app.use("/comments", commentsRouter);

app.use("/likes", likesRouter);

app.use("/reposts", repostsRouter);

app.use("/posts", postsRouter);

app.use("/messages", messagesRouter);

app.use(ErrorHandler.execute);
